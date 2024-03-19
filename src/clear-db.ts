import { sql } from './lib/postgres'

async function clearDb() {
  await sql/*sql*/ `
    DROP TABLE IF EXISTS short_links
  `
  await sql.end()

  console.log('Postgres clear successfully')
}

clearDb()
