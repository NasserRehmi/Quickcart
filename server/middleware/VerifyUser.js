import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token hh" });
      req.body.cin = decoded.cin; // Attach the user role to the request object
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    return res.json({ Status: false, Error: "Not authenticated" });
  }
};

export default verifyUser;
