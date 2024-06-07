import React, { useState, createContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// require("dotenv").config();

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [editUserDetails, setEditUserDetails] = useState({
		f_userName: '',
		f_Pwd: '',
		f_Email: '',
	});

	const notifyError = msg => toast.error(msg, { duration: 2000 });
	const notifySuccess = msg => toast.success(msg, { duration: 2000 });
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const registerAdmin = async data => {
		try {
			const response = await axios({
				method: 'POST',
				url: `http://localhost:5000/signup`,
				withCredentials: true,
				data: data,
			});
			console.log(response);
			notifySuccess('Signup Successfull');
			window.location.href = '/';
		} catch (error) {
			window.location.href = '/signup';
			notifyError('Invalid Signup Details');
			return;
		}
	};

	const userLogin = async data => {
		try {
			const response = await axios({
				method: 'POST',
				url: `http://localhost:5000/login`,
				withCredentials: true,
				data: data,
			});
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('userName', data.f_userName);
			notifySuccess('Login Successfull');
			window.location.href = '/dashboard';
		} catch (error) {
			window.location.href = '/';
			notifyError('Invalid Login Details');
			return;
		}
	};

	const editUser = async (email, formData) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.put(`http://localhost:5000/user`, formData, {
				headers: {
					authorization: token,
				},
			});
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('userName', response.data.name);
			notifySuccess('Employee updated successfully');
			window.location.href = '/dashboard';
		} catch (error) {
			notifyError('Unable to update employee');
		}
	};

	const fetchUser = async () => {
		try {
			const token = localStorage.getItem('token');
			console.log(token);
			const response = await axios.get('http://localhost:5000/user', {
				headers: {
					authorization: token,
				},
			});

			// notifySuccess('User Data fetched Successfully');
			setEditUserDetails(response.data);
			// return response.data;
		} catch (error) {
			notifyError('Unable to fetched data');
		}
	};
	const handleLogout = async () => {
		try {
			localStorage.removeItem('token');
			localStorage.removeItem('userName');
			window.location.href = '/';
			notifySuccess('Logout Successfully');
		} catch (error) {
			console.error('Logout failed:', error);
			notifyError('unable to logout');
		}
	};

	return (
		<UserContext.Provider
			value={{
				capitalizeFirstLetter,
				userLogin,
				registerAdmin,
				editUser,
				handleLogout,
				fetchUser,
				setEditUserDetails,
				editUserDetails,
			}}>
			{children}
		</UserContext.Provider>
	);
};
