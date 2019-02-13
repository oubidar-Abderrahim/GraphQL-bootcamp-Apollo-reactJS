import React from "react";

export const Post = ({ id, subject, content, user, timestamp }) => (
  <div key={id}>
    <h3>{subject}</h3>
    <p>{content}</p>
    <span>{timestamp}</span>
    <div>
      <label>Author</label>
      <p>{`${user.firstName} ${user.lastName}`}</p>
    </div>
  </div>
);
