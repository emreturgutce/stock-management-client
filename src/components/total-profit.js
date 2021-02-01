import React from 'react';
import {
	Avatar,
	Card,
	CardContent,
	Grid,
	Typography,
	makeStyles,
	colors,
	Box,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useCarState } from '../hooks/use-car-state';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	avatar: {
		backgroundColor: colors.indigo[600],
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

const TotalProfit = () => {
	const { totalProfit } = useCarState();
	const classes = useStyles();

	const formatPrice = (totalProfit) =>
		new Intl.NumberFormat('tr-TR', {
			style: 'currency',
			currency: 'TRY',
			minimumFractionDigits: 2,
		}).format(totalProfit);

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
							TOPLAM KAR
						</Typography>
						<Typography color='textPrimary' variant='h3'>
							{formatPrice(totalProfit)}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<AttachMoneyIcon />
						</Avatar>
					</Grid>
				</Grid>

				<Box mt={2} display='flex' alignItems='center'>
					<ArrowUpwardIcon className={classes.differenceIcon} />
					<Typography
						className={classes.differenceValue}
						variant='body2'
					>
						%32
					</Typography>
					<Typography color='textSecondary' variant='caption'>
						Geçen aydan beri
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default TotalProfit;
