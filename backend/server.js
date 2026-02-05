import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import todoRoutes from './routes/todo.routes.js'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });


import express from 'express'
import { conectdb } from './config/db.js'

const app = express()
app.use(express.json)

app.use("/api/todos",todoRoutes)
app.listen(5000, () => {
        conectdb()
    console.log("server started at http://localhost:5000")
})

















