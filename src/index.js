import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./Pages/App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// axios.defaults.baseURL= 'http://localhost:3000/';

// const instance = axios.create({
//    baseURL: 'https://api.talkie.team/',
//    timeout: 1000,
//    mode: 'cors',
//    headers: {"Access-Control-Allow-Origin": '*'},
//             "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
//             "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",

// });
// var cors = require('cors')
// instance.use(cors()) // Use this after the variable declaration
