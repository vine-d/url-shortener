import postgres from 'postgres'

export const sql = postgres('postgressql://myuser:mypassword@localhost:5432/shortener')
