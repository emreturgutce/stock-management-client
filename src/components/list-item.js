import { Grid, Divider } from '@material-ui/core';

const ListItem = ({ name, val }) => {
	return (
		<>
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={4}>
						<strong>{name}</strong>
					</Grid>
					<Grid item xs={8}>
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
