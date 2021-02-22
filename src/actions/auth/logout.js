import { toast } from 'react-toastify';
import { BASE_URL } from '../../constants/index';
import { AuthActionTypes } from '../types';

export const logout = () => (dispatch) => {
	fetch(`${BASE_URL}/api/personels/logout`, {
		method: 'GET',
		credentials: 'include',
	})
		.then(() => {
			dispatch({
				type: AuthActionTypes.LOGOUT_SUCCESS,
			});
			toast.success('Çıkış işlemi başarılı.', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		})
		.catch((err) => {
			toast.error('Çıkış yapılırken bir hata oluştu.', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		});
};
