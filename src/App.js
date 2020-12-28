import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import PrivateRoute from './components/private-route';
import Navbar from './components/navbar';
import { getUser } from './actions/auth/get-user';

const App = () => {
    const { isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const getUserCb = useCallback(() => dispatch(getUser()), [
        dispatch,
        getUser,
    ]);

    useEffect(() => {
        console.log('GET USER CALLED');
        getUserCb();
    }, []);

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
                    <PrivateRoute exact path='/' Children={Home} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            )}
        </Router>
    );
};

export default App;
