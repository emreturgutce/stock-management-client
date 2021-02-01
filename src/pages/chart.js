import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Cell,
} from 'recharts';
import { Box, Grid } from '@material-ui/core';
import { getSales } from '../actions/cars/get-sales';
import { useCarState } from '../hooks/use-car-state';

const Chart = () => {
	const dispatch = useDispatch();
	const { sales } = useCarState();
	const getSalesCb = useCallback(() => dispatch(getSales()), [dispatch]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeItem, setActiveItem] = useState(sales[activeIndex]);

	const handleClick = (data, index) => setActiveIndex(index);

	useEffect(getSalesCb, [getSalesCb]);

	useEffect(() => {
		setActiveItem(sales[activeIndex]);
	}, [activeIndex, sales]);
	console.log(activeItem);
	return (
		<>
			<Helmet>
				<title>Satış Grafiği - Stok Yönetim Sistemi</title>
			</Helmet>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '90%',
					margin: '60px auto',
				}}
			>
				<Box style={{padding: '12px 32px', borderRadius: 6}}>
					<h4>1 Aralık 2020 ve 1 Şubat 2021 Arası Satış Grafiği</h4>
					<BarChart
						width={800}
						height={400}
						data={sales}
						margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
					>
						<CartesianGrid strokeDasharray='5 5' />
						<XAxis dataKey='sale_date' />
						<YAxis dateKey='count' />
						<Tooltip />
						<Bar
							type='monotone'
							dataKey='count'
							onClick={handleClick}
						>
							{sales.map((entry, index) => (
								<Cell
									cursor='pointer'
									fill={
										index === activeIndex
											? '#82ca9d'
											: '#8884d8'
									}
									key={`cell-${index}`}
								/>
							))}
						</Bar>
					</BarChart>
					<p>
						<b>{activeItem.sale_date}</b> tarihinde{' '}
						<b>{activeItem.count}</b> adet araç satılmıştır.
					</p>
				</Box>
			</div>
		</>
	);
};

export default Chart;
