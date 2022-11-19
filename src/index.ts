import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { json } from 'express'
import * as mongoose from 'mongoose'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

import errorMiddleware from './middlewares/error.middleware'
import router from './router'

dotenv.config()

const defaultPort = 3000
const port = process.env.PORT || defaultPort

const app = express()

app.use(json())
app.use(cors())
app.use(morgan('[:date[iso]] Started :method :url for :remote-addr'))
app.use(
  morgan(
    '[:date[iso]] Completed :status :res[content-length] in :response-time ms'
  )
)
app.use('/api', router)
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(errorMiddleware)

const main = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string)
    app.listen(port, () => console.log(`Server is listening on port - ${port}`))
  } catch (e) {
    console.error(e)
  }
}

main()
