import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import UserListScreen from "./Screens/UserListScreen";

const App = () => {
  return (
    <Router>
      <Route path="/" component={UserListScreen} exact></Route>
      <Route path="/page/:pageNumber" component={UserListScreen}></Route>
    </Router>
  );
};

export default App;
