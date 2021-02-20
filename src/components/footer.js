import { Typography, Grid } from '@material-ui/core';

const Footer = () => {
	return (
		<Grid item container alignItems='center' justify='center' style={{ padding: '1rem' }}>
			<Typography variant='p'>
				Copyright © stock-management-system 2021.
			</Typography>
		</Grid>
	);
};

export default Footer;
