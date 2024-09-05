const express = require("express");
const v1router = express.Router();

// v1 Routes

const usermanagementModule = require("./modules/usermanagement/routes/routes");
v1router.use("/auth", usermanagementModule);

const newusermanagementModule = require("./modules/usermanagement/routes/index");
v1router.use("/user", newusermanagementModule);

const platform = require("./modules/platform/routes")
v1router.use("/platform", platform);

module.exports = v1router;
