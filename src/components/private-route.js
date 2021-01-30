import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from '../hooks';

const PrivateRoute = ({ Children, path }) => {
	const { isAuthenticated } = useAuthState();

	const routeComponent = (props) =>
		isAuthenticated ? (
			<Children />
		) : (
			<Redirect to={{ pathname: '/login' }} />
		);

	return <Route exact path={path} component={routeComponent} />;
};

export default PrivateRoute;
