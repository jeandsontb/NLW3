import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanatesMap from './pages/OrphanatesMap';
import Orphanate from './pages/Orphanate';
import CreateOrphanate from './pages/CreateOrphanate';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>                
                <Route path="/" exact component={Landing} />
                <Route path="/orphanates" exact component={OrphanatesMap} />
                <Route path="/orphanates/create" component={CreateOrphanate} />
                <Route path="/orphanates/:id" component={Orphanate} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;