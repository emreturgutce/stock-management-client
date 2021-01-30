import { useSelector } from 'react-redux';
import ListItem from './list-item';
import Loader from './content-loader';

const CarDetailRow = ({ name, value }) => {
	const { isLoading } = useSelector((state) => state.car);

	return (
		<ListItem
			name={name}
			val={
				isLoading ? (
					<Loader
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
