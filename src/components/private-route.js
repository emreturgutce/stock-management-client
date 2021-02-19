import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from '../hooks';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = useAuthState();

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
