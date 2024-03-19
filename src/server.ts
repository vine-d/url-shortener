import fastify from 'fastify'

const port = 3333

const app = fastify()

app.get('/test', async () => {
  return 'Hello World'
})

app.listen({ port }).then(() => {
  console.log(`Server listening on port ${port}`)
})
