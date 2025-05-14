import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  // Check if the token is present in the cookies
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, please login again!",
    });
  }

  try {
    // Decode the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token contains the user ID
    if (tokenDecode.id) {
      req.userId = tokenDecode.id;  // Attach the userId to req (not req.body)
      console.log("✅ Token decoded:", tokenDecode);
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please login again",
      });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token expiration or any other errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired, please login again",
      });
    }

    // Handle other JWT-related errors
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default userAuth;
