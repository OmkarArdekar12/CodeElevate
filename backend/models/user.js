const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema.js");
const User = mongoose.model("User", userSchema);

module.export = User;
