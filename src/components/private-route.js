import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ Children, path }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const routeComponent = (props) =>
        isAuthenticated ? (
            <Children />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );

    return <Route exact path={path} component={routeComponent} />;
};

export default PrivateRoute;
