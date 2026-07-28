import userModel from "../models/user.model.js";

import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExist) {
    res.status(400).json({
      message: "User Is already exists with this Username and email",
      success: false,
      err: "User already exists",
    });
  }

  const user = await userModel.create({ username, email, password });

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity",
    html: `
            <p>Hi ${username}</p>
            <p>Than You for Registering at <strong>Perplexity</strong> We're excited to have you pn board!!</p>
            <p>Best regards , <br> The Perplexity Team </p>
        `,
  });
  res.status(201).json({
    message: "User registered SuccessFully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
