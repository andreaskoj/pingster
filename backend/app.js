const express = require('express');
var cors = require('cors')

const { MongoClient } = require("mongodb");
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors())
const port = 3001;

//should take from env
const uri = 'mongodb://localhost:27017';
let db;

const initializeDatabase = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db('Pingster');
    const collection = db.collection('Matches');

    const count = await collection.countDocuments();
    if (count === 0) {
      const dataPath = path.join(__dirname, 'test-data.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

      await collection.insertMany(data);
      console.log('Inserted initial documents.');
    } else {
      console.log('Collection already has documents.');
    }
  } catch (err) {
    console.error('Error initializing database:', err);
    client.close();
  }
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
  const newMatch = req.body;
    const collection = db.collection('Matches');
    collection.insertOne(newMatch, (err, result) => {
      if (err) {
      console.error('Error inserting document:', err);
      res.status(500).send('Error inserting document');
      return;
      }
      console.log('Document inserted:', result.ops);
      res.send({ id: result.insertedId });
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});