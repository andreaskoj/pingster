const express = require('express');
var cors = require('cors')

const { MongoClient } = require("mongodb");

const app = express();
app.use(cors())
const port = 3001;

const uri = 'mongodb://localhost:32768';
const client = new MongoClient(uri);

//console.log(client);

// async function run() {
//   try {
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


let data =
  [
    {
      "Id": 1,
      "Player1": 
              { 
                "Name": "Magda",
                "Score": 2, 
              },
      "Player2": 
        	    { 
                "Name": "Andreas",
                "Score": 3, 
               },
      "Date" :"2023-11-04"
    },
    {
      "Id": 2,
      "Player1": 
              { 
                "Name": "Magda",
                "Score": 3, 
              },
      "Player2": 
        	    { 
                "Name": "Andreas",
                "Score": 2, 
               },
      "Date" :"2023-11-04"
    },
    {
      "Id": 3,
      "Player1": 
              { 
                "Name": "Magda",
                "Score": 3, 
              },
      "Player2": 
        	    { 
                "Name": "Andreas",
                "Score": 2, 
               },
      "Date" :"2023-11-04"
    }
  ]

app.get('/', (req, res) => {
  res.send("<div style='text-align: center; font-size: 36px;'>Pingster Backend!</div>");
});
  
app.get('/data', (req, res) => {
  res.send(data);
});

app.post('/data', (req, res) => {
  const newMatch = req.body; // Assuming the request body contains the new match data
  console.log("request",req);
  // Connect to the MongoDB database
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to connect to the database");
      return;
    }

    const database = client.db('Pingster');
    const matches = database.collection('Matches');

    // Insert the new match document
    matches.insertOne(newMatch, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Failed to add the match to the database");
        return;
      }

      res.status(200).send("Match added successfully");
    });

    client.close();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});