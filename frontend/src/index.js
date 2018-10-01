import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

document.addEventListener("DOMContentLoaded", () => {
  window.axios = axios;
  ReactDOM.render(<h1>React App</h1>, document.querySelector("#root"));
});