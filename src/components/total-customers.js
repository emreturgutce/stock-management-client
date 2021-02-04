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
import { ArrowUpward, People } from '@material-ui/icons';
import { useCarState } from '../hooks/use-car-state';
import AnimatedNumber from 'animated-number-react';

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
							<AnimatedNumber
								value={totalCustomer}
								duration={2000}
								formatValue={(value) => value.toFixed()}
							/>
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<People />
						</Avatar>
					</Grid>
				</Grid>
				<Box mt={2} display='flex' alignItems='center'>
					<ArrowUpward className={classes.differenceIcon} />
					<Typography
						className={classes.differenceValue}
						variant='body2'
					>
						%
						<AnimatedNumber
							value={16}
							formatValue={(value) => value.toFixed()}
							duration={1000}
						/>
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
