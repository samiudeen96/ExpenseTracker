import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];
//   console.log("Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded:", decoded);
    req.user = decoded;
    // console.log("auth:", req.user.id);
    

    next();
  } catch (error) {
    // console.error("JWT Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default requireAuth;
