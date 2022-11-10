const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

// Middle waears
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ldwl1cr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const serviceCollection = client.db('photographyService').collection('services');
        const reviewCollection = client.db('photographyService').collection('myreviews');

        app.get('/services', async(req,res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray();
            res.send(services);
        })

      
        app.get('/services/:id', async(req,res) => {
            let query = {}
            if(req.query.)
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service)
        })

        // Review api
        app.get('/myreviews', async(req,res)=> {
            const query = {}
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray();
            res.send(reviews)
        })

        app.post ('/myreviews',async(req,res) => {
            const reviews = req.body;
            const result = await reviewCollection.insertOne(reviews)
            res.send(result)
        })
    }
    finally{

    }

}

run().catch(err => console.error(err));

app.get('/',(req,res) => {
    res.send('photograpgy server is running')
})

app.listen(port, () => {
    console.log(`photography server is running on ${port}`)
})