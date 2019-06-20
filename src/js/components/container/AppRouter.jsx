import React from 'react';
import FormContainer from './FormContainer.jsx'
import Document from '../presentational/Document.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={FormContainer} />
            <Route path="/document" component={Document} />
        </Switch>
    </Router>
)

export default AppRouter
