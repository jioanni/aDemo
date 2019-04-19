import React from 'react';
import ReactDOM from 'react-dom'
import AppRouter from './js/components/container/AppRouter.jsx'

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<AppRouter />, wrapper) : false;

// import FormContainer from "./js/components/container/FormContainer.jsx";