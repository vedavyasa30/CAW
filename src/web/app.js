const express = require('express');

const app = express();

app.get('/', (req, res) => {

  res.send(`
    <html>
      <head>
        <title>Production URL Shortener</title>
      </head>

      <body style="
        background:black;
        color:white;
        font-family:Arial;
        padding:40px;
      ">

        <h1>Production URL Shortener</h1>

        <p>Frontend Running Successfully</p>

      </body>
    </html>
  `);

});

app.listen(3000, '0.0.0.0', () => {
  console.log('Frontend running on http://localhost:3000');
});
