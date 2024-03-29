import React from 'react';
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	makeStyles,
} from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { useCarState } from '../hooks/use-car-state';
import AnimatedNumber from 'animated-number-react';
import { formatPrice } from '../utils/format-price';

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

const TotalRevenue = ({ className, ...rest }) => {
	const { totalRevenue } = useCarState();
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
							Toplam Ciro
						</Typography>
						<Typography color='textPrimary' variant='h5'>
							<AnimatedNumber
								value={totalRevenue}
								duration={1000}
								formatValue={(value) => formatPrice(value)}
							/>
						</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<svg
								version='1.1'
								id='Capa_1'
								x='0px'
								y='0px'
								width='24px'
								height='24px'
								viewBox='0 0 47.001 47.001'
								fill='#fff'
							>
								<g>
									<g id='Layer_1_87_'>
										<g>
											<path d='M41.188,9.372c0-0.837-0.85-1.081-1.512-1.229v2.434C40.414,10.527,41.188,10.181,41.188,9.372z' />
											<path d='M38.938,4.185C38.102,4.209,37.56,4.702,37.56,5.23c0,0.615,0.458,0.971,1.379,1.155L38.938,4.185L38.938,4.185z' />
											<path
												d='M39.283,14.867c4.1,0,7.434-3.335,7.434-7.433S43.382,0,39.283,0c-4.101,0-7.436,3.335-7.436,7.434
				C31.847,11.532,35.182,14.867,39.283,14.867z M36.014,5.512c0-1.67,1.389-2.533,2.925-2.581V2.277
				c0-0.211,0.159-0.419,0.367-0.419c0.21,0,0.37,0.208,0.37,0.419v0.654c0.957,0.025,2.926,0.626,2.926,1.833
				c0,0.479-0.358,0.761-0.775,0.761c-0.801,0-0.788-1.315-2.15-1.34v2.336c1.624,0.344,3.06,0.824,3.06,2.717
				c0,1.646-1.229,2.483-3.06,2.594v0.76c0,0.21-0.16,0.419-0.37,0.419c-0.208,0-0.367-0.209-0.367-0.419v-0.76
				c-2.077-0.051-3.109-1.292-3.109-2.264c0-0.49,0.296-0.774,0.761-0.774c1.377,0,0.307,1.696,2.349,1.783v-2.57
				C37.118,7.675,36.014,6.877,36.014,5.512z'
											/>
											<path
												d='M9.355,33.113H2.946c-1.18,0-2.136,0.957-2.136,2.137v9.613C0.811,46.045,1.768,47,2.946,47h6.409
				c1.18,0,2.136-0.955,2.136-2.137V35.25C11.492,34.07,10.536,33.113,9.355,33.113z'
											/>
											<path
												d='M25.919,25.637H19.51c-1.18,0-2.136,0.957-2.136,2.137v17.091c0,1.182,0.957,2.137,2.136,2.137h6.409
				c1.18,0,2.137-0.955,2.137-2.137V27.771C28.056,26.594,27.1,25.637,25.919,25.637z'
											/>
											<path
												d='M42.486,17.091h-6.408c-1.181,0-2.137,0.957-2.137,2.136v25.636c0,1.182,0.957,2.137,2.137,2.137h6.408
				c1.181,0,2.137-0.955,2.137-2.137V19.228C44.624,18.048,43.667,17.091,42.486,17.091z'
											/>
											<path
												d='M29.675,10.972L24.37,9.863c-0.406-0.084-0.824,0.073-1.073,0.404c-0.249,0.332-0.283,0.777-0.088,1.144l1.176,2.211
				L0.863,25.755c-0.524,0.271-0.73,0.916-0.459,1.438c0.19,0.367,0.563,0.578,0.95,0.578c0.165,0,0.332-0.037,0.489-0.119
				l23.544-12.145l1.079,2.028c0.186,0.35,0.549,0.567,0.943,0.567c0.018,0,0.035-0.001,0.054-0.002
				c0.414-0.021,0.779-0.279,0.935-0.663l2.049-5.018c0.12-0.294,0.104-0.625-0.046-0.905C30.25,11.237,29.985,11.038,29.675,10.972
				z'
											/>
										</g>
									</g>
								</g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
							</svg>
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
							duration={500}
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

export default TotalRevenue;
