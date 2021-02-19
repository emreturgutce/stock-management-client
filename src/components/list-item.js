import { Grid, Divider, Typography } from '@material-ui/core';

const ListItem = ({ name, val }) => {
	return (
		<>
			<Grid item xs={12}>
				<Grid container alignItems='center'>
					<Grid item xs={6}>
						<Typography variant='body1'>{name}</Typography>
					</Grid>
					<Grid item xs={6}>
						{val}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
		</>
	);
};

export default ListItem;
