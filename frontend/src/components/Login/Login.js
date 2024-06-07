import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/user';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { userLogin } = useContext(UserContext);

	const handleUsernameChange = e => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = e => {
		setPassword(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		console.log(username + ' ' + password);
		const data = {
			f_userName: username,
			f_Pwd: password,
		};
		await userLogin(data);
	};

	return (
		<div className='xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md flex justify-center h-screen flex-col px-4'>
			<h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl'>
				Login
			</h2>
			<form
				className='mt-8'
				onSubmit={handleSubmit}>
				<div>
					<label
						className='text-base font-medium text-gray-900'
						htmlFor='username'>
						Username:
					</label>
					<input
						className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-2'
						type='text'
						id='username'
						value={username}
						onChange={handleUsernameChange}
						required
					/>
				</div>
				<div className='mt-2'>
					<label
						className='text-base font-medium text-gray-900'
						htmlFor='password'>
						Password:
					</label>
					<input
						className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-2'
						type='password'
						id='password'
						value={password}
						onChange={handlePasswordChange}
						required
					/>
				</div>
				<button
					className='w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 mt-6'
					type='submit'>
					Login
				</button>
			</form>
			<p className='mt-4 text-sm text-gray-600 text-center '>
				Don&apos;t have an account?{' '}
				<a
					href='/signup'
					className='font-semibold text-black transition-all duration-200 hover:underline'>
					Create a free account
				</a>
			</p>
		</div>
	);
};

export default Login;
