const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function oauth(req, next) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      `${process.env.CLIENT}/auth/google/callback`
    );
    const code = req.headers.token;
    const { tokens } = await oauth2Client.getToken(code);
    const data = jwt.decode(tokens.id_token);
    return data;
  } catch (err) {
    next(err);
  }
}

async function createOauthToken(payload) {
  return await jwt.sign(
    {
      user: payload.username,
      id: payload._id,
      img: payload.image,
    },
    process.env.oauth,
    { expiresIn: 60 * 60 }
  );
}

async function verify(pwd, hash) {
  return await bcrypt.compare(pwd, hash);
}

async function createAdminToken(payload) {
  return await jwt.sign(
    {
      user: payload.username,
      id: payload._id,
    },
    process.env.admin,
    { expiresIn: 60 * 60 }
  );
}

const authCheck = async (req, res, next) => {
  const token = req.method === "GET" ? req.headers.jwt : req.body.headers.jwt;
  jwt.verify(token, process.env.admin, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      next();
    }
  });
};

const userInfo = async (token) => {
  return await jwt.decode(token);
};

const appAuthCheck = (req, res, next) => {
  const token =
    req.method == "GET" || req.method == "DELETE"
      ? req.headers.jwt
      : req.body.headers.jwt;
  jwt.verify(token, process.env.oauth, (err, decodedToken) => {
    if (err) {
        res.status(401).json({ message: "Unauthorized" });
    } else {
      next();
    }
  });
};

module.exports = {
  oauth,
  createOauthToken,
  createAdminToken,
  verify,
  authCheck,
  userInfo,
  appAuthCheck
};
