const e = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
module.exports = function (req, res, next) {
	const bearerHeader = req.headers["authorization"];

	if (typeof bearerHeader === "undefined") {
		return res.status(401).send("user not authorized");
	}

	const token = bearerHeader.split(" ")[1];

	try {
		jwt.verify(token, process.env.JWT_KEY);
		next();
	} catch (err) {
		return res.status(401).send("Invalid token");
	}
};
