import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import * as functions from 'firebase-functions'
import * as express from 'express'

const server = express()

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  )

  await app.init()
}

export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(server)
  server(request, response)
})
