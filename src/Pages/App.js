import React, { Component } from "react";
// import { createStore, combineReducers } from "redux";
import Main from "../Main";
// import "./App.css";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { reducer as formReducer } from "redux-form";

// const store = createStore(rootReducer);
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
