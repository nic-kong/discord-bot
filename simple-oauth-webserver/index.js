const fetch = require('node-fetch');
const express = require('express');
const { clientId, clientSecret, port } = require('./config.json');

const app = express();

app.get('/discord/register/', async (request, response) => {
  const code = request.query.code;
  const state = request.query.state;

  if (code && state) {
    try {
      const user = JSON.parse(Buffer.from(state, 'base64').toString('ascii'));

      const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: `http://localhost:${port}/discord/register`,
          scope: 'identify',
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const oauthData = await oauthResult.json();

      const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });

      console.log(user.userid + '\'s discord user data');
      console.log(await userResult.json());
    } catch (error) {
      // NOTE: An unauthorized token will not throw an error;
      // it will return a 401 Unauthorized response in the try block above
      console.error(error);
    }
  }

  return response.sendFile('index.html', { root: '.' });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
