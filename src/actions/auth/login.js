import { toast } from 'react-toastify';
import { BASE_URL } from '../../constants/index';
import { AuthActionTypes } from '../types';

export const loginUser = (data) => (dispatch) => {
	fetch(`${BASE_URL}/api/personels/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: AuthActionTypes.LOGIN_SUCCESS,
					payload: res.data[0],
				});
				toast.success('Başarılı bir şekilde giriş yapıldı.', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				dispatch({
					type: AuthActionTypes.LOGIN_FAIL,
					payload: {
						error: 'Email veya şifre yanlış.',
					},
				});
				toast.error('Email veya şifre yanlış.', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: AuthActionTypes.LOGIN_FAIL,
				payload: {
					error: err,
				},
			});
			toast.error('Bir hata oluştu giriş yapılamadı.', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		});
};
