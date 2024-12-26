// Importing mongoose module for MongoDB object modeling
//import mongoose from "mongoose";
const { model , Schema  } = require("mongoose");

// Defining the schema for the User model
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating a model for the User schema
const UserModel = model("User", UserSchema);

// Exporting the User model
//export { UserModel as User}
module.exports = UserModel;