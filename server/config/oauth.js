const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

async function createOauthToken(payload, next) {
  try {
    return await jwt.sign(
      {
        user: payload.username,
        id: payload._id,
        img: payload.image,
      },
      process.env.oauth,
      { expiresIn: 15 * 60 }
    );
  } catch (error) {
    next(error);
  }
}

async function verify(pwd, hash, next) {
  try {
    return await bcrypt.compare(pwd, hash);
  } catch (error) {
    next(error);
  }
}

async function createAdminToken(payload, next) {
  try {
    return await jwt.sign(
      {
        user: payload.username,
        id: payload._id,
      },
      process.env.admin,
      { expiresIn: 15 * 60 }
    );
  } catch (error) {
    next(error);
  }
}

const authCheck = async (req, res, next) => {
  try {
    const token = req.method === 'GET' ? req.headers.jwt : req.body.headers.jwt;
    const decodedToken = await jwt.verify(token, process.env.admin);
    console.log(decodedToken);
    next();
  } catch (error) {
    const err = new Error(`Unauthorized, ${error.message}`);
    err.status = 401;
    next(err);
  }
};

const userInfo = async (token, next) => {
  try {
    return await jwt.decode(token);
  } catch (error) {
    next(error);
  }
};

const appAuthCheck = async (req, res, next) => {
  try {
    const token =
      req.method === 'GET' || req.method === 'DELETE'
        ? req.headers.jwt
        : req.body.headers.jwt;
    await jwt.verify(token, process.env.oauth);
    next();
  } catch (error) {
    const err = new Error(`Unauthorized, ${error.message}`);
    err.status = 401;
    next(err);
  }
};

async function hashPWD(pwd) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(pwd, salt);
  return hash;
}

module.exports = {
  oauth,
  createOauthToken,
  createAdminToken,
  verify,
  authCheck,
  userInfo,
  hashPWD,
  appAuthCheck,
};
