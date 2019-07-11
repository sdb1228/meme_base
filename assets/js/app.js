import React from "react";
import ReactDOM from "react-dom";
import css from "../css/app.css"
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Courses from "./Courses";
const client = new ApolloClient({
  uri: "https://vm8mjvrnv3.lp.gql.zone/graphql"
});
const Index = () => (
  <ApolloProvider client={client}>
    <div className="container">
      <div>
        <Courses />
      </div>
    </div>
  </ApolloProvider>
);

ReactDOM.render(<Index />, document.getElementById("index"));
