import dbConnect from "../../../../config/dbConnect";
import UserModel from "../../../../models/user";

const jwt = require("jsonwebtoken");
export default async function handler(req, res) {
  const { method } = req;
  const { email, password } = req.body;
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        if (!email || !password) {
          return res
            .status(401)
            .send({ message: "Details are Missing details" });
        }
        const isExisting = await UserModel.findOne({
          email: email,
          password: password,
        });
        if (isExisting) {
          const accessToken = jwt.sign(
            { id: isExisting._id },
            "expertia2023AccessToken",
            {
              expiresIn: "7 days",
            }
          );
          const refreshToken = jwt.sign(
            { id: isExisting._id },
            "expertia2023RefreshToken",
            {
              expiresIn: "28 days",
            }
          );
          return res.send({
            message: "Login Successful",
            accessToken: accessToken,
            refreshToken: refreshToken,
            id:isExisting._id,
            username:isExisting.username
          });
        } else {
            return res.status(401).send({message:"Invalid credentials"})
        }
      } catch (e) {
        return res.status(401).send({ message: e.message });
      }
    default:
      return res.status(401).send({ message: "Failed" });
  }
}
