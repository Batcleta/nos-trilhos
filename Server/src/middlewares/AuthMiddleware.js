const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const apiKey = req.header("apiKey");
  // const username = req.header("username");

  if (!apiKey) return res.json({ error: "user not logged in" });

  try {
    const validToken = verify(apiKey, "importantsecret");
    req.user = validToken;

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
