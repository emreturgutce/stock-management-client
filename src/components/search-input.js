import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';

const SearchInput = ({ isLoading, setSearchInput, cars }) => {
	const [suggestions, setSuggestions] = useState(cars);
	const [sInput, setSInput] = useState('');

	const changeInput = _.debounce(() => {
		setSearchInput(sInput);
	}, 500);

	useEffect(() => {
		changeInput();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sInput]);

	useEffect(() => {
		setSInput('');
	}, [isLoading]);

	const getSuggestionValue = (suggestion) => suggestion.title;

	const renderSuggestion = (suggestion) => <div>{suggestion.title}</div>;

	const onChange = (event, { newValue }) => {
		setSInput(newValue);
	};

	const onSuggestionsClearRequested = () => setSuggestions([]);

	const onSuggestionsFetchRequested = ({ value }) => {
		setSuggestions(getSuggestions(value));
	};

	const getSuggestions = (value) => {
		return value.length === 0
			? []
			: cars.filter((car) => {
					const regex = new RegExp(`\\b${value}`, 'ig');
					return car.title.match(regex);
			  });
	};

	return (
		<Autosuggest
			suggestions={suggestions}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			onSuggestionsClearRequested={onSuggestionsClearRequested}
			onSuggestionsFetchRequested={onSuggestionsFetchRequested}
			renderInputComponent={(inputProps) => (
				<TextField
					label='Aranacak Başlık'
					variant='outlined'
					{...inputProps}
				/>
			)}
			inputProps={{
				value: sInput,
				onChange,
			}}
		/>
	);
};

export default SearchInput;
