import ListItem from './list-item';
import Loader from './content-loader';
import { useCarState } from '../hooks';

const CarDetailRow = ({ name, value }) => {
	const { isLoading } = useCarState();

	return (
		<ListItem
			key={name}
			name={name}
			val={
				isLoading ? (
					<Loader
						name={name}
						header={false}
						rowCount={1}
						rowWidth='40%'
						rowHeight={25}
					/>
				) : (
					<>{value}</>
				)
			}
		/>
	);
};

export default CarDetailRow;
