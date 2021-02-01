import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import PrivateRoute from './components/private-route';
import Navbar from './components/navbar';
import Footer from './components/footer';
import CarDetail from './pages/car-detail';
import CarAdd from './pages/car-add';
import CarEdit from './pages/car-edit';
import Chart from './pages/chart';
import Profile from './pages/profile';
import NotFound from './pages/not-found';
import { getUser } from './actions/auth/get-user';
import { useAuthState } from './hooks';

const App = () => {
	const { isLoading } = useAuthState();
	const dispatch = useDispatch();

	const getUserCb = useCallback(() => dispatch(getUser()), [dispatch]);

	useEffect(() => {
		getUserCb();
	}, [getUserCb]);

	return (
		<Router>
			<Navbar />
			{isLoading ? (
				<div
					style={{
						width: '100%',
						height: '90%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<CircularProgress />
				</div>
			) : (
				<Switch>
					<Route exact path='/login' component={Login} />
					<PrivateRoute exact path='/' Children={Home} />
					<PrivateRoute exact path='/:id' Children={CarDetail} />
					<PrivateRoute exact path='/:id/edit' Children={CarEdit} />
					<PrivateRoute exact path='/cars/add' Children={CarAdd} />
					<PrivateRoute exact path='/cars/chart' Children={Chart} />
					<PrivateRoute
						exact
						path='/personels/profile'
						Children={Profile}
					/>
					<Route path="*" component={NotFound} />
				</Switch>
			)}
			<Footer />
		</Router>
	);
};

export default App;
