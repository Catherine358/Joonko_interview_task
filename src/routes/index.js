import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from 'pages/Login';
import Jobs from 'pages/Jobs';

const Routes = () => {
    return (
        <div className="routes-wrapper">
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/" exact component={Jobs}/>

                {/* 404 page - DO NOT CHANGE LOCATION */}
                <Route path="*" status={404}/>
            </Switch>
        </div>
    );
};

export default Routes;