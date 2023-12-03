const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors())
const port = 3001;

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

// Define a sample route
app.get('/data', (req, res) => {
  res.send(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});