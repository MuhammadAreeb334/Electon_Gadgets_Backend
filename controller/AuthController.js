const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleAuth(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    // If user does not exist → create
    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        provider: "google",
        role: "user",
      });
    }

    // Generate your JWT
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        provider: user.provider,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: "Google authentication failed",
      error: error.message,
    });
  }
}

module.exports = { googleAuth };