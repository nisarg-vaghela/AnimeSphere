function isAuthor(req, res, next) {
  // console.log("isAuthor", req.user, req.body);
  //console.log('>>>>>>>>>>>>>>>>', req);
  //when changing user details, id is in req.body._id but when changing reviews its in req.body.user._id
  if (req.user.id != req.body._id && req.user?.id != req.body?.user?._id)
    return res.status(403).json({ msg: "The user is not the author!" });
  next();
}

module.exports = isAuthor;
