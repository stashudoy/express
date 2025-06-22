import { ProductViewModel } from './../models/ProductViewModel';
import { ProductIdUriParamsModel } from '../models/ProductIdUriParamsModel';
import { ProductCreateModel } from '../models/ProductCreateModel'
import {ProductUpdateModel} from '../models/ProductUpdateModel'
import {ProductQueryModel} from '../models/ProductsQueryModel'
import express, {Request, Response} from 'express'
import { RequestWithQuery, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../types';
import { ProductType, AddressType, DBType} from '../db/db'


  

  
  const getViewModel= (p: ProductType): ProductViewModel => {
    return {
      id: p.id,
      title: p.title
    }
  }

export const getProductsRoutes = (db: DBType) => {

      const router = express.Router()

      // router.get('/', (req: Request, res: Response<ProductType[]>) => {
      //   //res.send(req.query.id)  // reflected http://localhost:5000/?id=<img src onerror=alert()>
      //   res.json(db.products)
      //   res.sendStatus(200)
      // })
      router.get('/', (req: RequestWithQuery<ProductQueryModel>, res: Response<ProductViewModel[]>) => {
        let searchProducts = db.products 
        if(req.query.title){  //http://localhost:5000/products?title=orange  Поиск по символам в названии  // если мы передаем два раза одинаковый параметр то это будет массив
          searchProducts = searchProducts.filter(p => p.title.indexOf(req.query.title) > -1)  // -1 это типа номер индекса
          res.json(searchProducts.map(getViewModel))   
        }  
        else{
          res.json(db.products)
        }  
      })
      router.get('/:id', (req: RequestWithParams<ProductIdUriParamsModel>, res: Response<ProductViewModel>) => {
        let product = db.products.find(p => p.id === +req.params.id)
        //res.send(req.params.title) //  reflected xss in params (uri)
        if(product){
          
          res.json(getViewModel(product))
        }else{
          res.sendStatus(404)
        }  
      })
      //  router.get('/product/:title', (req: RequestWithParams<{title:string}>, res: Response<ProductViewModel>) => {
      //   let product = db.products.find(p => p.title === req.params.title)
      //   if(product) {
      //     res.json(getViewModel(product))
      //   } else {
      //     res.sendStatus(404)
      //   }
      // })
      //  router.get('/addresses', (req: Request, res: Response<AddressType[]>) => {
      //     res.send(db.addresses)
      // })
      //   router.get('/addresses/:id', (req: RequestWithParams<ProductIdUriParamsModel>, res: Response<AddressType>) => {
      //   let address = db.addresses.find(a => a.id === +req.params.id)
      //   if(address){    
      //     res.json(address)
      //   }else{
      //     res.status(404)
      //   }
      // })
        router.delete('/:id', (req: RequestWithParams<ProductIdUriParamsModel>, res: Response) => {
        for (let i=0; i< db.products.length; i++){
          if(db.products[i].id === +req.params.id) {
            db.products.splice(i, 1)
            res.status(204)
            return
          }
        }
        res.send(404)
        } )
        router.post('/', (req: RequestWithBody<ProductCreateModel>, res:Response)=> {
          // don't forget import bodyParser from 'body-parser' and add midleware for json parsing
          if(!req.body.title){
            res.sendStatus(400)
            return
          }
          if(req.body.title){
          const newProduct = {id:+(new Date()), title: req.body.title}
          db.products.push(newProduct)
          res.status(201).send(newProduct)}
      
        })
        router.put('/:id', (req: RequestWithParamsAndBody<ProductIdUriParamsModel,ProductUpdateModel>, res:Response<ProductViewModel>)=> {
          if(!req.body.title){
            res.sendStatus(400)
            return
          }
          let product = db.products.find(p => p.id === +req.params.id)
          if(product) {
            product.title = req.body.title
            res.send(getViewModel(product))
            res.status(201)
          }else {
            res.status(404)
          } 
        })

        return router
}