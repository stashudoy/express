import {app} from './app'
//import {runDB} from './repositories/db'




const port = process.env.PORT || 5000



const startApp = async () => {

  //await runDB()
  app.listen(port, () => {
    console.log(`Example app listening port: ${port}`)
  })

}

app.listen(port, () => {
  console.log(`Example app listening port: ${port}`)
})

startApp()


