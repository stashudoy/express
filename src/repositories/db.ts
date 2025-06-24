
import { MongoClient } from 'mongodb'
import { ProductType } from './products-db-repository'

const mongoUri  = process.env.mongoURI || "mongodb://localhost:27017"   // на мас работает 0.0.0.0 а localhost

const client = new MongoClient(mongoUri)
const db = client.db("shop")
export const productsCollection = db.collection<ProductType>("products")

export async function runDB() {
    try {

        await client.connect()
        await client.db("products").command({ping: 1})
        console.log("Connection successfully to mongo server")
        
    } catch (error) {

        await client.close()
        
    }
}