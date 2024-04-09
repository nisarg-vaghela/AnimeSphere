const config = require("config");
const jwt = require("jsonwebtoken");

//its gonna send along a token
function auth(req, res, next) {
  //console.log(req);
  const token = req.header("x-auth-token");
  // console.log("in middleware auth", token);
  // console.log("body",req.body);
  // console.log("data",req.data);

  //check for token
  if (token==null)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    //in case the token is wrong
    res.status(400).json({ msg: "token is not valid" });
  }
}

module.exports = auth;
