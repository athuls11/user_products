import jwt from "jsonwebtoken";
const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  return token;
};

export default generateToken;
