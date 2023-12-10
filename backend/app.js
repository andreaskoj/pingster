const express = require('express');
var cors = require('cors')

const { MongoClient } = require("mongodb");

const app = express();
app.use(cors())
const port = 3001;

const uri = 'mongodb://localhost:27017/Pingster';
const client = new MongoClient(uri);

console.log(client);

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});