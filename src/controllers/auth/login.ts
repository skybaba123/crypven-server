import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import Alert from "@/models/alert";

const loginController = async (req: any, res: any) => {
  try {
    let user;
    user = await User.findOne({ email: req.body.email });
    if (!user) {
      user = await User.findOne({ username: req.body.email });
    }

    if (!user) return res.status(404).send({ error: "No user found" });

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.hashedPassword
    );
    if (!isPasswordMatch)
      return res.status(400).send({ error: "Password Mismatch" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "1d",
    });
    user.sessionToken = token;
    const updatedUser = await user.save();

    const deviceInfo = req.headers["user-agent"] || "Unknown";
    const ipAddress =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      "Unknown";
    const activityMessage = `You logged in from ${deviceInfo} (IP: ${ipAddress})`;

    await new Alert({
      message: activityMessage,
      type: "activity",
      ownerId: updatedUser._id,
    }).save();

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default loginController;
