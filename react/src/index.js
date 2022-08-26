import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configureStore, getDefaultMiddleweare } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userSlice from './redux/userSlice';

const store = configureStore({
	reducer: {
		user: userSlice,
	},
	//직렬화
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
