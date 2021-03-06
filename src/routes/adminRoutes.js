const express = require("express");
const addFoodImage = require("../admin/add-food-image");
const addWeeklyFoods = require("../admin/add-weekly-foods");
const multerUpload = require("../utils/multerUpload");
const verifyAdminToken = require("../utils/verifyAdminToken");
const route = express();

route.post(
	"/add/weeklyfoods",
	addWeeklyFoods.validateReq,
	verifyAdminToken,
	addWeeklyFoods.handler
);

route.post(
	"/add/foodimage",
	verifyAdminToken,
	multerUpload.single("image"),
	addFoodImage.handler
);

module.exports = route;
