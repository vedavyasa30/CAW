require('dotenv').config();

const fastify = require('fastify')({
  logger: true
});

const urlDatabase = {};

fastify.get('/health/live', async () => {

  return {
    status: 'ok'
  };

});

fastify.post('/api/v1/urls', async (request, reply) => {

  const originalUrl =
    request.body?.originalUrl;

  if (!originalUrl) {

    return reply.status(400).send({
      error: 'originalUrl required'
    });

  }

  const slug =
    Math.random()
      .toString(36)
      .substring(2, 8);

  urlDatabase[slug] =
    originalUrl;

  return {

    shortUrl:
      `${process.env.BASE_URL}/${slug}`

  };

});

fastify.get('/:slug', async (request, reply) => {

  const slug =
    request.params.slug;

  const originalUrl =
    urlDatabase[slug];

  if (!originalUrl) {

    return reply.status(404).send({
      error: 'URL not found'
    });

  }

  return reply.redirect(originalUrl);

});

fastify.listen({

  port:
    process.env.PORT || 4000,

  host:
    '0.0.0.0'

}, (err, address) => {

  if (err) {

    console.error(err);

    process.exit(1);

  }

  console.log(`API running at ${address}`);

});