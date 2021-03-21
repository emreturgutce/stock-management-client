import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CssBaseline, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
import AllSales from './pages/all-sales';
import { getUser } from './actions';
import { useAuthState } from './hooks';
import ForgotPassword from './pages/forgot-password';
import ChangePassword from './pages/change-password';
import Confirm from './pages/confirm';
import AwaitingEvents from './pages/awaiting-events';

const useStyles = makeStyles((theme) => ({
	offset: theme.mixins.toolbar,
}));

const App = () => {
	const { isLoading } = useAuthState();
	const dispatch = useDispatch();
	const classes = useStyles();

	const getUserCb = useCallback(() => dispatch(getUser()), [dispatch]);

	useEffect(() => {
		getUserCb();
	}, [getUserCb]);

	return (
		<Router>
			<CssBaseline />
			<Navbar />
			<div className={classes.offset} />
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
					<PrivateRoute exact path='/' component={Home} />
					<PrivateRoute
						exact
						path='/personels'
						component={Personel}
					/>
					<PrivateRoute exact path='/sales' component={AllSales} />
					<PrivateRoute
						exact
						path='/awaiting-events'
						component={AwaitingEvents}
					/>
					<PrivateRoute exact path='/:id' component={CarDetail} />
					<PrivateRoute exact path='/:id/edit' component={CarEdit} />
					<PrivateRoute exact path='/cars/add' component={CarAdd} />
					<PrivateRoute exact path='/cars/chart' component={Chart} />
					<PrivateRoute
						exact
						path='/personels/profile'
						component={Profile}
					/>
					<Route path='*' component={NotFound} />
				</Switch>
			)}
			<Footer />
			<ToastContainer />
		</Router>
	);
};

export default App;
