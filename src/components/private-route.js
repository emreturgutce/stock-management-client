import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAuthState } from '../hooks';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = useAuthState();
	const location = useLocation()

	if (isAuthenticated) {
		return <Route {...rest} render={(props) => <Component {...props} />} />;
	}

	return <Redirect to={`/login?referrer=${location.pathname}`} />;
};

export default PrivateRoute;
