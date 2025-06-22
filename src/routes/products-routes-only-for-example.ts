import { ProductViewModel } from './../models/ProductViewModel';
import { ProductIdUriParamsModel } from '../models/ProductIdUriParamsModel';
import { ProductCreateModel } from '../models/ProductCreateModel'
import {ProductUpdateModel} from '../models/ProductUpdateModel'
import {ProductQueryModel} from '../models/ProductsQueryModel'
import express, {Request, Response} from 'express'
import { RequestWithQuery, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../types';
import { ProductType, AddressType, DBType} from '../db/db'
import {db} from '../db/db'
import { Router } from 'express';

const getViewModel= (p: ProductType): ProductViewModel => {
    return {
      id: p.id,
      title: p.title
    }
  }

export const productsRouter = Router({})

          

productsRouter.get('/', (req: RequestWithQuery<ProductQueryModel>, res: Response<ProductViewModel[]>) => {
            let searchProducts = db.products 
            if(req.query.title){  //http://localhost:5000/products?title=orange  Поиск по символам в названии  // если мы передаем два раза одинаковый параметр то это будет массив
              searchProducts = searchProducts.filter(p => p.title.indexOf(req.query.title) > -1)  // -1 это типа номер индекса
              res.json(searchProducts.map(getViewModel))   
            }  
            else{
              res.json(db.products)
            }  
          })
          

productsRouter.get('/:id', (req: RequestWithParams<ProductIdUriParamsModel>, res: Response<ProductViewModel>) => {
            let product = db.products.find(p => p.id === +req.params.id)
            //res.send(req.params.title) //  reflected xss in params (uri)
            if(product){
              
              res.json(getViewModel(product))
            }else{
              res.sendStatus(404)
            }  
          })
  

            

productsRouter.delete('/:id', (req: RequestWithParams<ProductIdUriParamsModel>, res: Response) => {
            for (let i=0; i< db.products.length; i++){
              if(db.products[i].id === +req.params.id) {
                db.products.splice(i, 1)
                res.status(204)
                return
              }
            }
            res.send(404)
            } )
            

productsRouter.post('/', (req: RequestWithBody<ProductCreateModel>, res:Response)=> {
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
            

productsRouter.put('/:id', (req: RequestWithParamsAndBody<ProductIdUriParamsModel,ProductUpdateModel>, res:Response<ProductViewModel>)=> {
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



