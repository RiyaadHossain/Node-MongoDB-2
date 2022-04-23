const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middlewares:
app.use(cors()); //----- Get connected with server side
app.use(express.json()); //----- Parse the string data from client side

const { MongoClient, ServerApiVersion } = require("mongodb");
const { query } = require("express");
const uri =
  "mongodb+srv://mongodb1:RGxnfMquVhOYMmLM@mycluster.rn7n6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const itemCollection = client.db("myFood").collection("item");

    app.get('/item', async (req, res) => {
      const query = {}
      const cursor = itemCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/item', async (req, res) => {
      const newItem = req.body
      const result = await itemCollection.insertOne(newItem)
    })
  } finally {
    // await client.close() --- Don't close the client to let activate the server (for now)
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Running Node Server Successfully 🚀 ");
});

app.listen(port, () => {
  console.log(`Running at Port : ${port}`);
});
