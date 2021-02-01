import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Helmet from 'react-helmet';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		height: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	image: {
		marginTop: 50,
		display: 'inline-block',
		maxWidth: '100%',
		width: 560,
	},
}));

const NotFound = () => {
	const classes = useStyles();

	return (
		<>
			<Helmet>
				<title>Sayfa Bulunamadı - Stok Yönetim Sistemi</title>
			</Helmet>
			<Box
				display='flex'
				flexDirection='column'
				height='80%'
				justifyContent='center'
			>
				<Container maxWidth='md'>
					<Box textAlign='center'>
						<img
							alt='Under development'
							className={classes.image}
							src='/undraw_page_not_found_su7k.svg'
						/>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default NotFound;
