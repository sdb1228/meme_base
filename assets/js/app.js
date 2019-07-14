import React from "react";
import ReactDOM from "react-dom";
import css from "../css/app.css"
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import MemeBase from "./MemeBase";
const client = new ApolloClient({
  uri: "/graphql"
});
const Index = () => (
  <ApolloProvider client={client}>
    <div className="container">
      <div>
        <MemeBase />
      </div>
    </div>
  </ApolloProvider>
);

ReactDOM.render(<Index />, document.getElementById("index"));
