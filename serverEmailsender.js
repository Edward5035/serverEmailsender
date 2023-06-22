const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3008;

app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set('send_email', '1');
    encodedParams.set('email', req.body.email);
    encodedParams.set('from_name', req.body.from_name);
    encodedParams.set('subject', req.body.subject);
    encodedParams.set('message', req.body.message);

    const options = {
      method: 'POST',
      url: 'https://free-email-sender1.p.rapidapi.com/',
      headers: {
        'Content-Security-Policy': "script-src 'self' 'https://ssl.google-analytics.com';",
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '6c4153b579msh3b88fb9e42fb3dap1c3822jsn700d8fa34f4a',
        'X-RapidAPI-Host': 'free-email-sender1.p.rapidapi.com',
      },
      data: encodedParams,
    };

    const response = await axios.request(options);
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
