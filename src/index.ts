import express  from 'express'
const app = express()  //создали приложение, вызванная ф-ия express возвращает объект app, который может слушать порт и обрабатывать запросы и ответы
const port = 5000
const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}
const jsonBodyMiddleware = express.json()  // позволяет биты параметров body превращать в json
app.use(jsonBodyMiddleware)  // прежде чем закидывать в хендлеры ф-ий типа post нужно проеобразовать данные  в json также не забывать content-type: application/json
const db = {
  products:[
    {id:1, title: 'apple'},
    {id:2, title: 'orange'},
    {id:3, title: 'cherry'}
  ]}
app.get('/find1', (req, res)=> {
    res.send(req.query.title)   //http://localhost:5000/find1?title=%3Cimg%20src%20onerror=alert()%3E     =>  alert()

})  
app.get('/find2:title', (req, res)=> {   //http://localhost:5000/find2/%3Cimg%20src%20onerror=alert()%3E   => 404 not alert()
  res.send(req.params.title)

})  
app.get('/', (req, res) => {  //get - по другому это ф-ия handler, которая умеет обрабатывать запрос и возвращать ответ.
  res.send({message:'Hello, tester!'})
})
app.get('/products', (req, res) => {
  let foundProducts = db.products
  if(req.query.title){
// стандартный поиск с помощью indexOf(), пробегая по всем продуктам будут браться с индексами 0 и выше
    foundProducts = db.products.filter(p => p.title.indexOf(req.query.title as string) > -1)  
    res.json(foundProducts)}
   else{res.json(foundProducts)} 
   // если массив пустой не нужно делать проверку на пустоту
  })
app.get('/products/:id', (req, res) => {
  const products = db.products.find(p => p.id  === +req.params.id)  
  //product-псевдоним p => у которого p.id === точно равен параметру URI, + приведение к числовому формату, т.к. параметр в url строка  
  if(!products) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }
  res.json(products)
  })
//CREATE
app.post('/products', (req,res) => {
  if(!req.body.title){
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    res.json('Insert title')
    return
  }else{
    const newproduct = {
      id:  +(new Date()),
      title: req.body.title
    }
    db.products.push(newproduct)
    res.status(HTTP_STATUSES.CREATED_201).json(newproduct)
  }})
//DELETE
app.delete('/products/:id', (req, res) => {
    db.products = db.products.filter(p => p.id !== +req.params.id) //выбрось те продукты которые не равны этим id  
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) 
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//UPDATE
app.put('/products/:id', (req, res) => {
  if(!req.body.title){
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    res.json('Insert title')
    return
  }
  const foundProduct = db.products.find(p => p.id  === +req.params.id)  
  //product-псевдоним p => у которого p.id === точно равен параметру URI, + приведение к числовому формату, т.к. параметр в url строка  
  if(!foundProduct) {
    res.sendStatus(404)
    return
  }
  foundProduct.title = req.body.title
  res.sendStatus(204)
  })


