import { productsCollection } from './db';

export type ProductType = {
    id: number,
    title: string
  }





export const productRepository = {


  async findQueryTitleProducts(title: string | null | undefined): Promise<ProductType[]> {
    const filter: any = {}
    if(title){ 
        filter.title = {$regex: title}      
      }  
     
    return productsCollection.find(filter).toArray()
      
   },

  async createProduct(name: string| null | undefined): Promise<ProductType | undefined> {    
      if(name) {
        const newProduct = {
          id: + (new Date()),
          title: name
        }
        //xss storage in body param: get_by_id(when res.send(product.title))res.send(product.title)
        const result = await productsCollection.insertOne(newProduct)
        return newProduct    
      }
    },

  async findProductById(id: number): Promise<ProductType | null> {
    let product = await productsCollection.findOne({ id: id})  // можно оставить просто {id}
    //res.send(req.params.title) //  reflected xss in params (uri)
    return product
   },

  async updateProductById(id: number, name: string): Promise<boolean> {
      let product = await productsCollection.updateOne(
        {id: id},
        { $set: { title: name}}
      )      

     return product.matchedCount ===1
   },

  async deleteProductById(id: number): Promise<boolean>{
    let product = productsCollection.deleteOne({id: id})
    //res.send(req.params.title) //  reflected xss in params (uri)
    if((await product).deletedCount === 1){
      return true
    } 
    
    return false
   },
}