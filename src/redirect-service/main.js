const express = require('express');

const app = express();

app.get('/:slug', (req, res) => {

  const slug = req.params.slug;

  console.log(`Redirect request for ${slug}`);

  res.redirect('https://www.google.com');

});

app.listen(4001, '0.0.0.0', () => {
  console.log('Redirect service running on http://localhost:4001');
});
