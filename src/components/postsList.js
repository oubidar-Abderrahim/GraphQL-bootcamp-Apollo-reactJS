import React from "react";
import { Query } from "react-apollo";
import { Post } from "./post";
import gql from "graphql-tag";

// using graphQl tag to englobe our query
const getPosts = gql`
  query getPosts {
    posts(order_by: { timestamp: desc }) {
      id
      subject
      content
      user {
        firstName
        lastName
      }
      timestamp
    }
  }
`;

export const PostsList = () => (
  // using react-apollo Query tag
  // with apollo we don't need to worry about state, we get a data, error and loading states to use
  <Query query={getPosts}>
    {({ data, error, loading }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;
      return data.posts.map(Post);
    }}
  </Query>
);
