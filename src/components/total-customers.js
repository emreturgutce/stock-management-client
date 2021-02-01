import React from 'react';
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	colors,
	makeStyles,
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { useCarState } from '../hooks/use-car-state';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	avatar: {
		backgroundColor: colors.green[600],
		height: 56,
		width: 56,
	},
	differenceIcon: {
		color: colors.green[900],
	},
	differenceValue: {
		color: colors.green[900],
		marginRight: theme.spacing(1),
	},
}));

const TotalCustomers = ({ className, ...rest }) => {
	const { totalCustomer } = useCarState();
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid container justify='space-between' spacing={3}>
					<Grid item>
						<Typography
							color='textSecondary'
							gutterBottom
							variant='h6'
						>
							TOPLAM MÜŞTERİ
						</Typography>
						<Typography color='textPrimary' variant='h3'>
							{totalCustomer}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<PeopleIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Box mt={2} display='flex' alignItems='center'>
					<ArrowUpwardIcon className={classes.differenceIcon} />
					<Typography
						className={classes.differenceValue}
						variant='body2'
					>
						%16
					</Typography>
					<Typography color='textSecondary' variant='caption'>
						Geçen aydan beri
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default TotalCustomers;
