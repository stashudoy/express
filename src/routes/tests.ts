import express, {Request, Response, Express} from 'express'
import { DBType } from './../db/db';


export const getTestsRouter = (db: DBType) => {

    const router = express.Router()

    router.delete('/data', (req:Request, res:Response) => {
        db.products = []
        res.send()
        res.sendStatus(204)
      })

      return router
}

