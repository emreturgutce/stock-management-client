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
import Personel from './pages/personel';
import NotFound from './pages/not-found';
import LatestSales from './pages/latest-sales';
import { getUser } from './actions';
import { useAuthState } from './hooks';
import ForgotPassword from './pages/forgot-password';
import ChangePassword from './pages/change-password';
import Confirm from './pages/confirm';

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
					<Route
						exact
						path='/forgot-password'
						component={ForgotPassword}
					/>
					<Route
						exact
						path='/user/change-password/:token'
						component={ChangePassword}
					/>
					<Route
						exact
						path='/user/confirm/:token'
						component={Confirm}
					/>
					<PrivateRoute exact path='/' Children={Home} />
					<PrivateRoute exact path='/personels' Children={Personel} />
					<PrivateRoute exact path='/:id' Children={CarDetail} />
					<PrivateRoute exact path='/:id/edit' Children={CarEdit} />
					<PrivateRoute exact path='/cars/add' Children={CarAdd} />
					<PrivateRoute exact path='/cars/chart' Children={Chart} />
					<PrivateRoute
						exact
						path='/personels/profile'
						Children={Profile}
					/>
					<PrivateRoute
						exact
						path='/sales/latest'
						Children={LatestSales}
					/>
					<Route path='*' component={NotFound} />
				</Switch>
			)}
			<Footer />
		</Router>
	);
};

export default App;
