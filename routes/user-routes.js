const express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt");
const { User, Review, Message, Follow } = require('../models');
const path = require("path");
const sequelize = require('../config/connection');
//const { Sequelize } = require('sequelize/types');

//signup



//login
//render routes





//logout
router.delete("/logout", (req, res) => {
	if (!req.session.user) {
		return res.redirect("login")
	}
	req.session.destroy();
	res.json({ msg: "logged out!" })
})

// User directory.
router.get("/directory", (req, res) => {
	User.findAll({
		attributes: ["id", "first_name", "last_name",
//			[sequelize.fn("COUNT", sequelize.col("UserId")), "friends"]
			[sequelize.fn("COUNT", sequelize.col("follower_id")), "friends"],
			[sequelize.fn("COUNT", sequelize.col("business_id")), "reviews"],
			[sequelize.fn("COUNT", sequelize.col("chatter1_id")), "comments"]],
		include: [
			{
				model: User,
				as: "friend",
				required: false,

				attributes: []
			},
			{ model: Follow, required: false, attributes: [] },
			{ model: Review, attributes: [] },
			{ model: Message, attributes: [] }],
		group: ["User.id"]
	}).then(results => results.map(user => user.toJSON()))
	.then(users => {
		const data = { users };
		for (let k in req.session.user)
			data[k] = req.session.user[k];
		console.log("USER1:", data.users[0])
		console.log("USER2:", data.users[1])
		res.render("users", data);
	});
});

//profile routes
router.get('/', async (req, res) => {
	if (!req.session.user) {
		return res.redirect("login")
	}

	try {
		const allUsers = await User.findAll()
		res.json(allUsers)

	} catch (err) {
		if (err) {
			res.status(500).json({ msg: "ERROR", err })
		}
	}

});

router.get('/feed', async (req, res) => {
	if (!req.session.user) {
		return res.redirect("login")
	}
	try {

	} catch (err) {
		if (err) {
			res.status(500).json({ msg: "ERROR", err })
		}
	}
	res.render('feed', req.session.user)
});

module.exports = router;
//other user profiles
//other user profiles





