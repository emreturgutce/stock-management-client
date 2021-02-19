import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { trTR } from '@material-ui/core/locale';
import { tr } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import App from './App';
import { store } from './store';

const theme = createMuiTheme(
	{
		palette: {
			primary: {
				main: '#1769aa',
			},
			secondary: {
				main: '#b2102f',
			},
		},
		props: {
			MuiTypography: {
				variantMapping: {
					p: 'p'
				}
			}
		}
	},
	trTR,
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={tr}>
					<App />
				</MuiPickersUtilsProvider>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
