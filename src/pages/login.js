import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
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
import { loginUser } from '../actions/auth/login';
import ErrorAlert from '../components/error-alert';

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
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthenticated: isAuth, errors } = useSelector(
        (state) => state.auth,
    );

    const login = useCallback(
        (email, password) => dispatch(loginUser({ email, password })),
        [dispatch],
    );

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            validator.isEmail(email) &&
            validator.isLength(password, { min: 6 })
        ) {
            login(email, password);

            history.push('/');
        }
    };

    const renderErrors = () => {
        if (errors && errors.length > 0) {
            return <ErrorAlert errors={errors} />;
        }
    };

    return (
        <>
            {!isAuth ? (
                <>
                    <Helmet>
                        <title>Anasayfa - Stock Management System</title>
                    </Helmet>
                    <Container component='main' maxWidth='xs'>
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component='h1' variant='h5'>
                                Giriş Yap
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
                                    label='Email Adresi'
                                    name='email'
                                    autoComplete='email'
                                    autoFocus
                                    error={
                                        email !== '' &&
                                        !validator.isEmail(email)
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
                                    label='Şifre'
                                    type='password'
                                    id='password'
                                    error={
                                        password !== '' &&
                                        !validator.isLength(password, {
                                            min: 6,
                                        })
                                    }
                                    autoComplete='current-password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value='remember'
                                            color='primary'
                                        />
                                    }
                                    label='Beni hatırla'
                                />
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    className={classes.submit}
                                >
                                    Giriş yap
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href='#' variant='body2'>
                                            Şifreni mi unuttun?
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>
                </>
            ) : (
                <Redirect to='/' />
            )}
        </>
    );
}
