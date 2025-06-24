import { Router, Request, Response } from "express";



const addresses =[{id:1, value: 'Moscow'},{id:2, value: 'London'}]
  

export const addressesRouter = Router({})


addressesRouter.get('/', (req: Request, res: Response) => {   
  
   // После того как создали удаляем addresses
   // Далее в index.js app.use('/addresses', addressesRouter )

              res.json(addresses)
          })
addressesRouter.get('/:id', (req: Request, res: Response) => {
let address = addresses.find(a => a.id === +req.params.id)
  if(address){    
    res.json(address)
  }else{
    res.status(404)
      }
})