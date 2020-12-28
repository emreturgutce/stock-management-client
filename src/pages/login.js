import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import validator from 'validator';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import { loginUser } from '../actions/auth/login';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [closeError, setCloseError] = useState(true);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthenticated: isAuth, isLoading, errors } = useSelector(
        (state) => state.auth,
    );

    const login = useCallback(
        (email, password) => dispatch(loginUser({ email, password })),
        [dispatch, loginUser],
    );

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            validator.isEmail(email) &&
            validator.isLength(password, { min: 6 })
        ) {
            login(email, password);
            console.log('REDIRECTING TO HOMEPAGE');
            history.push('/');
        }
    };

    const renderErrors = () => {
        if (errors && errors.length > 0) {
            return (
                <Collapse in={closeError}>
                    <Alert
                        severity='error'
                        onClose={() => setCloseError(false)}
                    >
                        <AlertTitle>Error</AlertTitle>
                        {errors.map((error) => error)}
                    </Alert>
                </Collapse>
            );
        }
    };

    return (
        <>
            {!isAuth ? (
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Sign in
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={onSubmit}
                        >
                            {renderErrors()}
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                error={
                                    email !== '' && !validator.isEmail(email)
                                }
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                error={
                                    password !== '' &&
                                    !validator.isLength(password, { min: 6 })
                                }
                                autoComplete='current-password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='remember'
                                        color='primary'
                                    />
                                }
                                label='Remember me'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='#' variant='body2'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href='#' variant='body2'>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            ) : (
                <Redirect to='/' />
            )}
        </>
    );
}
