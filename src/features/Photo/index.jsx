import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/Main';
import NotFound from 'components/NotFound';
import AddEdit from './pages/AddEdit';

function Photo(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.url} component={(props) => <MainPage{...props} />} />

            <Route exact path={`${match.url}/add`} component={AddEdit} />
            <Route exact path={`${match.url}/:photoId`} component={(props) => <AddEdit{...props} />} />

            <Route component={NotFound} />
        </Switch>
    )
}

Photo.propTypes = {

}
export default Photo

