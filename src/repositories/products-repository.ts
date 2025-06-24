import { ProductType } from "../db/db"

const  products  = [{id:1, title: 'tomato'},{id:2,title:'orange'}]

export const productRepository = {
    async findQueryTitleProducts(title: string | null | undefined): Promise<ProductType[]> {
    if(title){ 
       
        let filtredProducts =products.filter(p => p.title.indexOf(title) > -1)  // -1 это типа номер индекса
        return filtredProducts   
      }  
      else{
        return products
      } 
   },

   async createProduct(name: string| null | undefined): Promise<ProductType | undefined> {

    
      if(name) {
        //xss storage in body param: get_by_id(when res.send(product.title))res.send(product.title)
        const newProduct = {id:+(new Date()), title: name}
        products.push(newProduct)
        return newProduct  // т.к. мы установили тип Promise<ProductType>, то при возвращении это автоматически вернет промис
   
      }



   },

   async findProductById(id: number): Promise<ProductType | undefined> {
    let product = products.find(p => p.id === id)
    //res.send(req.params.title) //  reflected xss in params (uri)
    return product
   },

   async updateProductById(id: number, name: string): Promise<boolean> {
      let product = products.find(p => p.id === id)
      if(product) {
        product.title = name
        return true
      }
      else return false
   },

  async deleteProductById(id: number): Promise<boolean>{
    let product = products.find(p => p.id === id)
    //res.send(req.params.title) //  reflected xss in params (uri)
    for (let i=0; i< products.length; i++){
        if(products[i].id === id) {
          products.splice(i, 1)
          return true
      }

    }   
    
    return false
   },
}