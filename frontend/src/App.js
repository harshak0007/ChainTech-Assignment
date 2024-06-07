import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Signup from './components/Signup/Signup';
import EditEmployee from './components/EditUser/EditUser';
import { Toaster } from 'react-hot-toast';

const App = () => {
	return (
		<Router>
			<div>
				{localStorage.getItem('userName') && <Navbar />}
				<Routes>
					<Route
						exact
						path='/'
						element={<Login />}
					/>
					<Route
						exact
						path='/signup'
						element={<Signup />}
					/>
					<Route
						exact
						path='/dashboard'
						element={<Dashboard />}
					/>
					<Route
						exact
						path='/editUser'
						element={<EditEmployee />}
					/>
				</Routes>
			</div>
			<Toaster />
		</Router>
	);
};

export default App;
