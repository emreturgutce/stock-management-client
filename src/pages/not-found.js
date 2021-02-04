import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../components/page'

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
		<Page title='Sayfa Bulunamadı'>
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
		</Page>
	);
};

export default NotFound;
