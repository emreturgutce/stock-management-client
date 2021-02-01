import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import App from './App';
import { store } from './store';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#1769aa',
		},
		secondary: {
			main: '#b2102f',
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
