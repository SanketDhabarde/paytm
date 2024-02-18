const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const User = model("User", userSchema);

module.exports = { User };
