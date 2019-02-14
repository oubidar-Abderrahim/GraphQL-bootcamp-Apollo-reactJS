import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const getUsers = gql`
  query getUsers {
    users {
      id
      firstName
      lastName
    }
  }
`;

const addPost = gql`
  mutation addPost($subject: String!, $content: String!, $userId: uuid!) {
    insert_posts(
      objects: [{ subject: $subject, content: $content, userId: $userId }]
    ) {
      returning {
        id
      }
    }
  }
`;

export const AddPost = () => {
  // let's use react's hooks to save our data
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <Mutation mutation={addPost}>
      {(addPost, { data }) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            addPost({
              variables: {
                subject,
                content,
                userId
              },
              refetchQueries: ["getPosts"]
            });
          }}
        >
          <fieldset>
            <input
              type="text"
              placeholder="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
            <Query query={getUsers}>
              {({ data, error, loading }) => {
                if (loading) return <div>Loading users...</div>;
                if (error) return <div>Error in users</div>;
                // our userId shouldn't be empty from the beginning so..
                setUserId(data.users[0].id);
                return (
                  <select
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                  >
                    {data.user.map(user => (
                      <option key={user.id} value={user.id}>
                        {`${user.firstName} ${user.lastName}`}
                      </option>
                    ))}
                  </select>
                );
              }}
            </Query>
            <textarea
              placeholder="content"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <input className="button-primary" type="submit" value="submit" />
          </fieldset>
        </form>
      )}
    </Mutation>
  );
};
