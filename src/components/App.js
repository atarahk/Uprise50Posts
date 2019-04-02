import React from "react";
import { Route } from "react-router-dom";

import PostList from "./PostList";
import Details from "./Details";

const App = () => {
  return (
    <div className="ui container">
      <Route path="/" exact component={PostList} />
      <Route path="/details/:id/:userid" exact component={Details} />
    </div>
  );
};

export default App;
