// Input Schema Rule Matcher Interceptor Middleware
module.exports = (req, res, next) => {
  const { email, password } = req.body;
  
  if (req.path === "/register" || req.path === "/login") {
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Validation Exception. The format of the assigned email address parameter string is invalid." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Validation Exception. The structural compliance rules dictate that password length parameters exceed 5 characters." });
    }
  }
  next();
};