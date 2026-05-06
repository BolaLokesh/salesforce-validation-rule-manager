const express = require('express');
const jsforce = require('jsforce');
const crypto = require('crypto');

require('dotenv').config();

const router = express.Router();

let conn;

const codeVerifier = crypto.randomBytes(64).toString('hex');

const codeChallenge = crypto
  .createHash('sha256')
  .update(codeVerifier)
  .digest('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');

const oauth2 = new jsforce.OAuth2({
  loginUrl: process.env.SF_LOGIN_URL,
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  redirectUri: process.env.SF_REDIRECT_URI
});

router.get('/login', (req, res) => {

  const authUrl =
    `${process.env.SF_LOGIN_URL}/services/oauth2/authorize` +
    `?response_type=code` +
    `&client_id=${process.env.SF_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.SF_REDIRECT_URI)}` +
    `&scope=api refresh_token full` +
    `&code_challenge=${codeChallenge}` +
    `&code_challenge_method=S256`;

  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {

  const code = req.query.code;

  try {

    const response = await fetch(
      `${process.env.SF_LOGIN_URL}/services/oauth2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.SF_CLIENT_ID,
          client_secret: process.env.SF_CLIENT_SECRET,
          redirect_uri: process.env.SF_REDIRECT_URI,
          code: code,
          code_verifier: codeVerifier
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.log(data);
      return res.status(400).json(data);
    }

    conn = new jsforce.Connection({
      instanceUrl: data.instance_url,
      accessToken: data.access_token
    });

    res.send("Salesforce Login Successful");

  } catch (err) {

    console.log(err);

    res.status(500).send(err.message);
  }
});

router.get('/validation-rules', async (req, res) => {

  try {

    if (!conn) {
      return res.status(400).send('Please login first');
    }

    const result = await conn.tooling.query(
      "SELECT Id, ValidationName, Active, EntityDefinition.QualifiedApiName FROM ValidationRule"
    );

    res.json(result.records);

  } catch (err) {

    console.log(err);

    res.status(500).send(err.message);
  }
});
router.post('/toggle-rule', async (req, res) => {

  try {

    const { fullName, active } = req.body;

    if (!conn) {
      return res.status(400).send('Please login first');
    }

    const metadata = await conn.metadata.read(
      'ValidationRule',
      fullName
    );

    metadata.active = active;

    const result = await conn.metadata.update(
      'ValidationRule',
      metadata
    );

    res.json(result);

  } catch (err) {

    console.log(err);

    res.status(500).send(err.message);
  }
});
module.exports = router;