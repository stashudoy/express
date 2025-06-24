import { ProductType } from '../repositories/products-db-repository';
import { productRepository } from "../repositories/products-db-repository"






export const productServices = {


  async findQueryTitleProducts(title: string | null | undefined): Promise<ProductType[]> {
    const filter: any = {}
    
     
    return productRepository.findQueryTitleProducts(title)
      
   },

   async updateProductById(id: number, title: string): Promise<boolean> {
    return await productRepository.updateProductById(id, title)

 },

  async createProduct(name: string): Promise<ProductType | undefined> {          
        const newProduct = {
          id: + (new Date()),
          title: name
        }        
        const createdProduct = await productRepository.createProduct(newProduct)
        return createdProduct  
      },
    



  async findProductById(id: number): Promise<ProductType | null> {
    
    return productRepository.findProductById(id)
   },



  async deleteProductById(id: number): Promise<boolean>{
    
   return await productRepository.deleteProductById(id)
   },
}