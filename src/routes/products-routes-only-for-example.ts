
import { ProductType } from '../db/db';
import { Router, Request, Response } from "express";
import { productServices } from "../domains/products-service";
import { body} from "express-validator";
import {inputValidationMiddleware} from '../midlewares/input-validation-midleware'




export const productsRouter = Router({}) 

const titleValidation = body('title').trim().isLength({min: 0, max: 300}).withMessage('title: 3-300')



productsRouter.get('/', async (req: Request, res: Response) => {
  const foundProducts = await productServices.findQueryTitleProducts(req.query.title ? req.query.title?.toString():null)
 res.send(foundProducts)})

productsRouter.post('/', 
            titleValidation,
            inputValidationMiddleware,
            async (req: Request, res: Response) => {          
              const newProduct = await productServices.createProduct(req.body.title)
              res.status(201).send(newProduct)
              // избежать 500х ошибок невозможно, рано или поздно они все равно будут, нужно пытаться их избегать         
            })            
          

productsRouter.get('/:id', async (req: Request, res: Response) => {
            let product: ProductType | null = await productServices.findProductById(+req.params.id)
            if(product){              
              res.send(product.title)   //if createProduct: {"title":"<img src onerror=alert()>"}  => XSS stored
            }else{
              res.sendStatus(404)
            }  
          })
  
productsRouter.put('/:id', 
              titleValidation,
              inputValidationMiddleware,
              async (req: Request, res:Response)=> {
   
            
            
            let isUpdated= await productServices.updateProductById(+req.params.id, req.body.title)
            if(isUpdated){
              //res.send(isUpdated)
              let product  = await productServices.findProductById(+req.params.id)
              res.status(201).send(product)
            }else {
              res.send(isUpdated)
              res.status(404)
            } 
          })          

            

productsRouter.delete('/:id', async (req: Request, res: Response) => {
  let isDeleted = await productServices.deleteProductById(+req.params.id)

  if(isDeleted == true) {
    res.json("Product deleted")
  } else {
    res.json("Product is not deleted")
  }           
  } )
            


            





