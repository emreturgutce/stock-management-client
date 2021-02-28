import { useEffect, useState } from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import _ from 'lodash';
import { Handle, Track, Tick } from './date-range-components';

const sliderStyle = {
	margin: '5%',
	position: 'relative',
	width: '90%',
};

const railStyle = {
	position: 'absolute',
	width: '100%',
	height: 8,
	borderRadius: 7,
	cursor: 'pointer',
	backgroundColor: 'rgb(155,155,155)',
};

const domain = [new Date('2020-12-01').getTime(), Date.now()];

const DateRangeSlider = ({ getSalesCb }) => {
	const [values, setValues] = useState([
		new Date('2020-12-01').getTime(),
		Date.now(),
	]);
	const fetchChartData = _.debounce(() => {
		getSalesCb(
			new Date(values[0]).toISOString().split('T')[0],
			new Date(values[1]).toISOString().split('T')[0],
		);
	}, 2000);

	useEffect(() => {
		fetchChartData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	const onChange = (vals) => {
		if (vals[0] !== values[0] || vals[1] !== values[1]) {
			setValues(vals);
		}
	};

	return (
		<div style={{ height: 120, width: '100%' }}>
			<Slider
				mode={1}
				step={86400000}
				domain={domain}
				rootStyle={sliderStyle}
				onSlideEnd={onChange}
				values={values}
			>
				<Rail>
					{({ getRailProps }) => (
						<div style={railStyle} {...getRailProps()} />
					)}
				</Rail>
				<Handles>
					{({ handles, getHandleProps }) => (
						<div className='slider-handles'>
							{handles.map((handle) => (
								<Handle
									key={handle.id}
									handle={handle}
									domain={domain}
									getHandleProps={getHandleProps}
								/>
							))}
						</div>
					)}
				</Handles>
				<Tracks left={false} right={false}>
					{({ tracks, getTrackProps }) => (
						<div className='slider-tracks'>
							{tracks.map(({ id, source, target }) => (
								<Track
									key={id}
									source={source}
									target={target}
									getTrackProps={getTrackProps}
								/>
							))}
						</div>
					)}
				</Tracks>
				<Ticks count={10}>
					{({ ticks }) => (
						<div className='slider-ticks'>
							{ticks.map((tick) => (
								<Tick
									key={tick.id}
									tick={tick}
									count={ticks.length}
								/>
							))}
						</div>
					)}
				</Ticks>
			</Slider>
		</div>
	);
};

export default DateRangeSlider;
