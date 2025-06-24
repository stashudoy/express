
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

  async createProduct(newProduct: ProductType): Promise<ProductType | undefined> {    
      
      
        const result = await productsCollection.insertOne(newProduct)
        return newProduct    
      
    },


  async updateProductById(id: number, title: string): Promise<boolean> {
        const result = await productsCollection.updateOne({id: id}, { $set: { title: title}})
        return result.matchedCount === 1
    }, 
    
    


  async findProductById(id: number): Promise<ProductType | null> {
    let product: ProductType| null = await productsCollection.findOne({id: id})
    return product
   },



  async deleteProductById(id: number): Promise<boolean>{
    let product = await productsCollection.deleteOne({id: id})
    return product.deletedCount === 1
  }
     
}