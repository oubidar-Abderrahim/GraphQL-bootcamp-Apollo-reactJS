import React from "react";
import ReactDOM from "react-dom";
import { PostsList, AddPost } from "./components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./styles.css";

const client = new ApolloClient({
  uri: "https://graphql-bootcamp-sample-blog.herokuapp.com/v1alpha1/graphql",
  // let's see what's happening when we send a request using Apollo
  // we do this by passing a function here
  request: async operation => {
    console.log(operation);
  }
  // other use is to set a token in header for authorization
  // this is how authorization basically works in Apollo :
  //
  // request: async operation => {
  //   const token = localStorage.getItem("token");
  //   operation.setContext({
  //     headers: {
  //        authorization: token
  //     }
  //   });
  //}
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AddPost />
        <PostsList />
      </div>
    </ApolloProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
