const { User } = require("../schema/user.schema");
const { Account } = require("../schema/account.schema");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

const signUpSchema = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signUp = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  try {
    const { success } = signUpSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ error: "Invalid input" });
    }
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.status(411).json({ error: "User already exists" });
    }
    const encryptedPassword = bcrypt.hashSync(password, 8);
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      password: encryptedPassword,
    });
    
    // Initialize user with random balance
    await Account.create({
      userId: newUser._id,
      balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { success } = signInSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ error: "Invalid inputs" });
    }

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(411).json({ error: "user does not exists" });
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      return res.status(401).json({ error: "incorrect password" });
    }

    const token = jwt.sign({ userId: foundUser._id }, JWT_SECRET);

    return res.status(200).json({ message: "Logged in", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

const updateUser = async (req, res) => {
  const { firstName, lastName, password } = req.body;
  const userId = req.userId;
  try {
    const { success } = updateUserSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ error: "Invalid inputs" });
    }
    let encryptedPassword;
    if (password) {
      encryptedPassword = bcrypt.hashSync(password, 8);
    }
    const foundUser = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      password: encryptedPassword,
    });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const findUser = async (req, res) => {
  const { filter } = req.query;
  try {
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });
    return res.json({
      users: users.map((user) => ({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { signUp, signIn, updateUser, findUser };
