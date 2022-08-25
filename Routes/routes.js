const express = require("express");
const router = express.Router();
const { getstudent } = require("../app");

router.get("/", getstudent);
