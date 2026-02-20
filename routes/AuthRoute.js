const express = require("express");
const { googleAuth } = require("../controllers/AuthController");

const googleRouter = express.Router();

googleRouter.post("/google", googleAuth);

module.exports = googleRouter;