import { useState } from 'react';
import { TextField } from '@material-ui/core';
import Autosuggest from 'react-autosuggest';

const SearchInput = ({ searchInput, setSearchInput, cars }) => {
	const [suggestions, setSuggestions] = useState(cars);

	const getSuggestionValue = (suggestion) => suggestion.title;

	const renderSuggestion = (suggestion) => <div>{suggestion.title}</div>;

	const onChange = (event, { newValue }) => setSearchInput(newValue);

	const onSuggestionsClearRequested = () => setSuggestions([]);

	const onSuggestionsFetchRequested = ({ value }) => {
		setSuggestions(getSuggestions(value));
	};

	const getSuggestions = (value) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0
			? []
			: cars.filter((car) => {
					const regex = new RegExp(inputValue, 'ig');

					return car.title.toLowerCase().match(regex);
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
				value: searchInput,
				onChange,
			}}
		/>
	);
};

export default SearchInput;
