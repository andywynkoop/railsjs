import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

document.addEventListener("DOMContentLoaded", () => {
  window.axios = axios;
  ReactDOM.render(<h1>This is your react app!</h1>, document.querySelector("#root"));
});