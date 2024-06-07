const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Login = require('../models/Login');
// const Employee = require('../models/Employee');
const bcryptsjs = require('bcryptjs');

const jwt = require('jsonwebtoken');
const verifyToken = require('./verify');
require('dotenv').config();

// Login Routes
// Create login
let nextSno = 1;
let nextSnoEmp = 1;
const isDuplicateEmailSignup = async email => {
	const existingEmail = await Login.findOne({ f_Email: email });
	return existingEmail != null;
};
router.post('/signup', async (req, res) => {
	try {
		const { f_userName, f_Email, f_Pwd } = req.body;
		const result = await isDuplicateEmailSignup(f_Email);

		if (result) {
			return res.status(400).send({ error: 'Email already exists.' });
		}

		const salt = await bcryptsjs.genSalt(10);
		const hashedPassword = await bcryptsjs.hash(f_Pwd, salt);
		const login = new Login({
			f_sno: nextSno++,
			f_userName: f_userName,
			f_Email: f_Email,
			f_Pwd: hashedPassword,
		});

		await login.save();

		res.status(200).send({ message: 'Successful' });
	} catch (error) {
		res.status(400).send(error);
	}
});
router.post('/login', async (req, res) => {
	try {
		const { f_userName, f_Pwd } = req.body;
		console.log(req.body);
		const user = await Login.findOne({ f_userName: f_userName });
		console.log(user);

		const validpassword = await bcryptsjs.compare(f_Pwd, user.f_Pwd);

		if (!validpassword) {
			return res.status(400).send({ error: 'Check your credentials!' });
		}

		const tokenData = {
			id: user._id,
			username: user.f_userName,
			email: user.f_Email,
		};

		const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
			expiresIn: '1h',
		});

		// Send token to the client
		res.status(200).json({ token });
	} catch (error) {
		res.status(400).send(error);
	}
});

// Get all logins
router.get('/logins', async (req, res) => {
	try {
		const logins = await Login.find();
		res.send(logins);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Employee Routes
// Create employee
// Validate email format
const isValidEmail = email => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

// Numeric validation
const isNumeric = value => {
	return /^\d+$/.test(value);
};

// Check if email already exists
const isDuplicateEmail = async (email, employee) => {
	const existingEmail = await Employee.find({ f_Email: email });
	for (let i = 0; i < existingEmail.length; i++) {
		if (existingEmail[i] !== null && !existingEmail[i]._id.equals(employee._id))
			return true;
	}
	return false;
};

router.get('/user', verifyToken, async (req, res) => {
	try {
		console.log(req.user);
		const employee = await Login.findOne({ f_Email: req.user.email });
		console.log(employee);
		res.send(employee);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.put('/user', verifyToken, async (req, res) => {
	try {
		const { f_userName, f_Email, f_Pwd, f_NewPwd } = req.body;

		const user = await Login.findById(req.user.id);

		const validpassword = await bcryptsjs.compare(f_Pwd, user.f_Pwd);

		if (!user) {
			return res.status(404).send({ error: 'Employee not found.' });
		}

		// Validate fields
		if (!f_userName || !f_Pwd || !f_Email || !f_NewPwd) {
			return res.status(400).send({ error: 'All fields are required.' });
		}
		if (!validpassword) {
			return res.status(400).send({ error: 'Invalid Password .' });
		}
		const salt = await bcryptsjs.genSalt(10);
		const hashedPassword = await bcryptsjs.hash(f_NewPwd, salt);
		user.f_userName = f_userName;
		user.f_Pwd = hashedPassword;
		user.f_Email = f_Email;
		const tokenData = {
			id: user._id,
			username: user.f_userName,
			email: user.f_Email,
		};

		const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
			expiresIn: '1h',
		});
		await user.save();
		res.status(200).json({ token, name: f_userName });
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
