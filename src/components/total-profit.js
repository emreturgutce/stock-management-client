import React from 'react';
import {
	Avatar,
	Card,
	CardContent,
	Grid,
	Typography,
	makeStyles,
	colors,
} from '@material-ui/core';
import { AttachMoney, ArrowUpward } from '@material-ui/icons';
import { useCarState } from '../hooks/use-car-state';
import { formatPrice } from '../utils/format-price';
import AnimatedNumber from 'animated-number-react';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	avatar: {
		backgroundColor: '#1769aa',
		height: 56,
		width: 56,
	},
	differenceIcon: {
		color: '#69aa17',
	},
	differenceValue: {
		color: '#69aa17',
		marginRight: theme.spacing(1),
	},
}));

const TotalProfit = () => {
	const { totalProfit } = useCarState();
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
							Toplam Kar
						</Typography>
						<Typography color='textPrimary' variant='h5'>
							<AnimatedNumber
								value={totalProfit}
								formatValue={(value) => formatPrice(value)}
								duration={1000}
							/>
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<AttachMoney />
						</Avatar>
					</Grid>
				</Grid>
				<Grid
					container
					item
					alignItems='center'
					style={{ marginTop: '1rem' }}
				>
					<ArrowUpward className={classes.differenceIcon} />
					<Typography
						className={classes.differenceValue}
						variant='body2'
					>
						%
						<AnimatedNumber
							value={32}
							formatValue={(value) => value.toFixed()}
							duration={1000}
						/>
					</Typography>
					<Typography color='textSecondary' variant='caption'>
						Geçen aydan beri
					</Typography>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default TotalProfit;
