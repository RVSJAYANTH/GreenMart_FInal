import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!tokenDecode?.id) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    req.user = { userId: tokenDecode.id };
    next();

  } catch (error) {
    console("Token verification failed:", error.message);
    console.error("JWT Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or Expired Token" });
  }
};

export default authUser;
