import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/user';

const EditEmployee = ({ match }) => {
	const [formData, setFormData] = useState({
		f_userName: '',
		f_Pwd: '',
		f_NewPwd: '',
		f_Email: '',
	});
	const { editUser, editUserDetails, fetchUser } = useContext(UserContext);

	useEffect(() => {
		const fetchUserDetails = async () => {
			await fetchUser();
		};
		fetchUserDetails();
		setFormData(editUserDetails);
		console.log(formData);
	}, [editUserDetails, fetchUser]);

	const handleSubmit = async e => {
		e.preventDefault();
		editUser(formData.f_Email, formData);
		setFormData({
			f_userName: '',
			f_Pwd: '',
			f_NewPwd: '',
			f_Email: '',
		});
	};

	return (
		<div className='xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md flex justify-center h-screen flex-col mt-14 px-5'>
			<h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl'>
				Edit User Details
			</h2>
			<form
				className='mt-8'
				onSubmit={handleSubmit}>
				<div className='mt-2'>
					<label
						className='text-base font-medium text-gray-900'
						htmlFor='name'>
						Name:
					</label>
					<input
						className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-2'
						type='text'
						id='name'
						name='f_Name'
						value={formData.f_userName}
						onChange={e =>
							setFormData({ ...formData, f_userName: e.target.value })
						}
						required
					/>
				</div>
				<div className='mt-2'>
					<label
						className='text-base font-medium text-gray-900'
						htmlFor='email'>
						Email:
					</label>
					<input
						className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-2'
						type='email'
						id='email'
						name='f_Email'
						value={formData.f_Email}
						onChange={e =>
							setFormData({ ...formData, f_Email: e.target.value })
						}
						required
					/>
				</div>

				<div className='mt-2'>
					<label
						className='text-base font-medium text-gray-900'
						htmlFor='password'>
						Enter Old Password:
					</label>
					<input
						className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-2'
						type='password'
						id='password'
						name='f_Pwd'
						onChange={e => setFormData({ ...formData, f_Pwd: e.target.value })}
						required
					/>
				</div>
				<div className='mt-2'>
					<label
						className='text-base font-medium text-gray-900'
						htmlFor='password'>
						New Password:
					</label>
					<input
						className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-2'
						type='password'
						name='f_NewPwd'
						onChange={e =>
							setFormData({ ...formData, f_NewPwd: e.target.value })
						}
						required
					/>
				</div>

				<button
					className='w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 mt-6'
					type='submit'>
					Update User
				</button>
			</form>
		</div>
	);
};

export default EditEmployee;
