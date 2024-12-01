const express = require('express');
var cors = require('cors')

const { MongoClient } = require("mongodb");
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors())
const port = 3001;

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

app.get('/', (req, res) => {
  res.send("<div style='display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 36px; font-weight: bold;'>Pingster Backend</div>");
});

//needs authentication
app.get('/data', async (req, res) => {
  try {
    const collection = db.collection('Matches');
    const data = await collection.find({}).toArray();
    res.send(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

app.post('/data', (req, res) => {
  const newMatch = req.body;
  console.log("request", newMatch);

  const mongoURL = 'mongodb://localhost:32768/Pingster';

  MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return;
    }
    console.log('Connected to MongoDB');

    const db = client.db();

    const collection = db.collection('Matches');
    collection.insertOne({ key: 'value' }, (err, result) => {
      if (err) {
        console.error('Error inserting document:', err);
        return;
      }
      console.log('Document inserted:', result.ops);
    });

    // Close the connection when done
    client.close();
  });
  // MongoClient.connect(uri, (err, client) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send("Failed to connect to the database");
  //     return;
  //   }

  //   console.log("connected?");

  //   const database = client.db('Pingster');
  //   const matches = database.collection('Matches');

  //   console.log("about to insert");

  //   matches.insertOne(newMatch, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send("Failed to add the match to the database");
  //       return;
  //     }

  //     res.status(200).send("Match added successfully");
  //   });

  //   console.log("after insert");

  //   client.close();
  // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});