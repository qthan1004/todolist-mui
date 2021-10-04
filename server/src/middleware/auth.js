const jwt = require("jsonwebtoken");

//HEADER SẼ ĐƯỢC GỬI VỀ DẠNG: authorization: <username> <token>
//=> cần lấy token trong header ra để kiểm tra xem có phải token real k ?
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userID = decode.userID;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = verifyToken;
