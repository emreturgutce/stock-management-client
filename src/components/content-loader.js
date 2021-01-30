import ContentLoader from 'react-content-loader';

const Loader = ({ header, rowCount, rowWidth, rowHeight, name }) => {
	function renderRows() {
		let top = header ? 10 : 0;
		const arr = [];

		for (let i = 0; i < rowCount; i++) {
			arr.push(
				<rect
					x='0'
					y={top * (i + 1)}
					rx='3'
					ry='3'
					width={rowWidth}
					height={rowHeight}
				/>,
			);
		}

		return arr;
	}

	return (
		<ContentLoader viewBox={`0 0 430 ${20 * rowCount}`}>
			{header && <rect x='0' y='0' rx='3' ry='3' width='80' height='8' />}
			{renderRows()}
		</ContentLoader>
	);
};

export default Loader;
