import { db } from './db/db';
import express from 'express'
import bodyParser from 'body-parser'
import {getProductsRoutes} from './routes/products'
import {getTestsRouter } from './routes/tests';
import { addressesRouter } from './routes/addresses-routes-only-for-example';



export const app = express()   // export for tests    
  
  app.use(bodyParser.urlencoded());
  
  app.use(bodyParser.json());
  
  const productRouter = getProductsRoutes(db)
  const testRouter = getTestsRouter(db)

  app.use("/products", productRouter)
  app.use('/addresses', addressesRouter)
  app.use("/__test__", testRouter)


  
