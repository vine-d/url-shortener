import fastify from 'fastify'
import postgres from 'postgres'
import { sql } from './lib/postgres'
import { CreateLinkRequest, ExpandCodeParams } from './types'
import { redis } from './lib/redis'

const port = 3333

const app = fastify()

app.post('/:code', async (request, response) => {
  const { code } = ExpandCodeParams.parse(request.params)

  const result = await sql/*sql*/ `
    SELECT id, original_url
    FROM short_links
    WHERE short_links.code = ${code}
  `

  if (result.length !== 1) {
    return response.status(404).send({ error: 'Not found' })
  }
  const id = result[0].id
  const url = result[0].original_url

  await redis.zIncrBy('expanded-codes', 1, String(id))

  return response.redirect(301, url)
})

app.get('/api/links', async (_request, response) => {
  const result = await sql/*sql*/ `
    SELECT *
    FROM short_links
    ORDER BY created_at DESC
  `

  return response.status(200).send({ links: result })
})

app.post('/api/links', async (request, response) => {
  const { code, url } = CreateLinkRequest.parse(request.body)

  try {
    const result = await sql/*sql*/ `
    INSERT INTO short_links (code, original_url)
    VALUES (${code}, ${url})
    RETURNING id
  `

    const link = result[0]

    return response.status(201).send({ shortLinkId: link.id })
  } catch (err) {
    if (err instanceof postgres.PostgresError) {
      if (err.code === '23505') {
        return response.status(409).send({ error: 'Duplicated: Code already in use' })
      }
    }
    console.error(err)
    return response.status(500).send({ message: 'Internal Server Error' })
  }
})

app.get('/api/metrics', async (_request, response) => {
  const result = await redis.zRangeByScoreWithScores('expanded-codes', 0, 50)
  return result
    .sort((a, b) => b.score - a.score)
    .map((item) => ({ shortLinkId: Number(item.value), clicks: item.score }))
})

app.listen({ port }).then(() => {
  console.log(`Server listening on port ${port}`)
})
