import { sql } from './lib/postgres'

async function setupDb() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS short_links (
      id SERIAL PRIMARY KEY,
      original_url TEXT NOT NULL,
      code TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  await sql.end()

  console.log('Postgres set up successfully')
}

setupDb()
