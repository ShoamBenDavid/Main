const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const generateJWT = require("../helpers/jwt");
const Family = require("../models/family");
const { v4: uuidv4 } = require('uuid');
const createUser = async (req, res) => {
  const { email, password, name, familyId, familyName } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ ok: false, msg: "User email already exists" });
    }

    // Hash the user's password and create the user
    const salt = bcryptjs.genSaltSync();
    user = new User({
      name,
      email,
      password: bcryptjs.hashSync(password, salt),
    });
    await user.save();

    let family;
    if (familyId) {
      // Attempt to add the user to an existing family
      family = await Family.findOne({ familyId });
      if (!family) {
        return res.status(404).json({ ok: false, msg: "Family not found" });
      }
    } else {
      // Generate a UUID for the familyId if not provided
      const generatedFamilyId = uuidv4();
      
      // Create a new family with the generated familyId and familyName
      family = new Family({
        familyId: generatedFamilyId,
        name: familyName,
        members: [{ userId: user._id, roleInFamily: 'parent' }],
      });
    }

    // Add the user to the family members and save
    if (!family.members.find(member => member.userId.equals(user._id))) {
      family.members.push({ userId: user._id, roleInFamily: 'parent' });
    }
    await family.save();

    // Generate a JWT for the user
    const token = await generateJWT(user._id, user.name);

    // Respond with the new user, familyId, and token
    return res.status(201).json({
      ok: true,
      user,
      familyId: family.familyId,
      token,
      familyName: family.name,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User email does not exist",
      });
    }

    // Verify if passwords match
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        msg: "Invalid password.",
      });
    }

    const token = await generateJWT(user.id, user.name);

    return res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const renewToken = async (req, res) => {
  const { id, name } = req;

  const token = await generateJWT(id, name);

  res.json({ ok: true, user: { _id: id, name }, token });
};

module.exports = { createUser, loginUser, renewToken };
