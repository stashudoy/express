import { db } from './db/db';
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import {getProductsRoutes} from './routes/products'
import {getTestsRouter } from './routes/tests';
import { addressesRouter } from './routes/addresses-routes-only-for-example';
import { productsRouter } from './routes/products-routes-only-for-example';



export const app = express()   // export for tests 

  
  // const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //   if(req.query.token === "123") {
  //     next()
  //   } else {
  //     res.send(401)
  //   }
  // }



  // app.use(authGuardMiddleware)
  // let requestCounter = 0

  // const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //  requestCounter ++
  //  next()
  // }
  // app.use(requestCounterMiddleware)
  
  app.use(bodyParser.urlencoded());
  
  app.use(bodyParser.json());
  
  //const productRouter = getProductsRoutes(db)  // that with types
  const testRouter = getTestsRouter(db)

  app.use("/products", productsRouter)
  app.use('/addresses', addressesRouter)
  app.use("/__test__", testRouter)  // only for types routes


  
