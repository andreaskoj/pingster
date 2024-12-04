const express = require('express');
const cors = require('cors')
const { MongoClient } = require("mongodb");
const app = express();

app.use(express.json());
app.use(cors())

const port = 3001;
//should take from env
const uri = 'mongodb://localhost:27017';
const databseName = 'Pingster';

let db;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const initializeDatabase = async () => {
  const client = new MongoClient(uri);
  db = client.db(databseName);
};

initializeDatabase();

app.get('/', (_, res) => {
  res.send("<div style='display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 36px; font-weight: bold;'>Pingster Backend</div>");
});

//needs authentication
app.get('/matches', async (_, res) => {
  try {
    const collection = db.collection('Matches');
    const data = await collection.find({}).toArray();
    const mappedData = data.map(item => ({
      ...item,
      Id: item._id
    }));
    res.send(mappedData);
  } catch (err) {
    console.error('Error fetching data:', err);

    res.status(500).send('Error fetching data');
  }
});

//needs authentication
app.post('/matches', (req, _) => {

  //needs to create collection before inserting the first document?
  const newMatch = req.body;
    const collection = db.collection('Matches');
    collection.insertOne(newMatch, (err, result) => {
      if (err) {
      console.error('Error inserting document:', err);
      res.status(500).send('Error inserting document');
      return;
      }
      res.send({ id: result.insertedId });
    });
  });

