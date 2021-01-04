import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from '../actions/auth/logout';

const useStyles = makeStyles((theme) =>
    createStyles({
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
    }),
);

export default function LetterAvatar({ firstLetter }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();

    const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLout = () => {
        handleLogout();
        history.push('/login');
    };

    return (
        <div>
            <Button type='button' onClick={handleClick}>
                <Avatar className={classes.orange}>{firstLetter}</Avatar>
            </Button>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profil</MenuItem>
                <MenuItem onClick={handleClose}>Hesabım</MenuItem>
                <MenuItem onClick={handleLout}>Çıkış</MenuItem>
            </Menu>
        </div>
    );
}
