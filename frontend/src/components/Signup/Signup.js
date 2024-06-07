import React, { useState, useContext } from 'react';
import { ArrowRight } from 'lucide-react';
// import { Link } from "react-dom";
import { UserContext } from '../../context/user';

const Signup = () => {
	const [formData, setFormData] = useState({
		f_userName: '',
		f_Email: '',
		f_Pwd: '',
	});

	const { registerAdmin } = useContext(UserContext);

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async e => {
		e.preventDefault();
		await registerAdmin(formData);
	};
	return (
		<section>
			<div className='xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md flex justify-center h-screen flex-col px-4'>
				<div className='flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
					<div className='w-full xl:mx-auto xl:w-full xl:max-w-lg 2xl:max-w-lg'>
						<h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl'>
							Sign up
						</h2>
						<form
							className='mt-8'
							onSubmit={handleSubmit}>
							<div className='space-y-5'>
								<div>
									<label
										htmlFor='name'
										className='text-base font-medium text-gray-900'>
										{' '}
										Full Name{' '}
									</label>
									<div className='mt-2'>
										<input
											className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
											type='text'
											placeholder='Full Name'
											id='name'
											name='f_userName'
											value={formData.f_userName}
											onChange={handleChange}></input>
									</div>
								</div>
								<div>
									<label
										htmlFor='email'
										className='text-base font-medium text-gray-900'>
										{' '}
										Email address{' '}
									</label>
									<div className='mt-2'>
										<input
											className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
											type='email'
											placeholder='Email'
											id='email'
											name='f_Email'
											value={formData.f_Email}
											onChange={handleChange}></input>
									</div>
								</div>
								<div>
									<div className='flex items-center justify-between'>
										<label
											htmlFor='password'
											className='text-base font-medium text-gray-900'>
											{' '}
											Password{' '}
										</label>
									</div>
									<div className='mt-2'>
										<input
											className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
											type='password'
											placeholder='Password'
											name='f_Pwd'
											value={formData.f_Pwd}
											onChange={handleChange}></input>
									</div>
								</div>
								<div>
									<button
										type='submit'
										className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'>
										Create Account{' '}
										<ArrowRight
											className='ml-2'
											size={16}
										/>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
