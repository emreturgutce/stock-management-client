import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import PrivateRoute from './components/private-route';

function App() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path='/' Children={Home} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
