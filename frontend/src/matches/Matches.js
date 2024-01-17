import React from 'react';
import './Matches.css'

export default function Matches({ data, setData }) {
    let form = {
        Player1: "",
        Player2: "",
        ScorePlayer1: "",
        ScorePlayer2: "",
        Date: ""
    }

    //const [formData, setFormData] = React.useState();
    const [showForm, setShowForm] = React.useState(false);
    const [showAddButton, setShowAddButton] = React.useState(true);
    const [showCancelButton, setShowCancelButton] = React.useState(false);
    const [showConfirmButton, setConfirmButton] = React.useState(false);

    const handleAddClick = () => {
        setShowAddButton(false)
        setShowCancelButton(true)
        setConfirmButton(true)
        setShowForm(true)
    }

    const handleCancelClick = () => {
        setShowAddButton(true)
        setShowCancelButton(false)
        setConfirmButton(false)
        setShowForm(false)
    }

    const handleConfirmClick =  () => {
        setShowAddButton(true)
        setShowCancelButton(false)
        setConfirmButton(false)
        setShowForm(false)

        console.log(form)

        if (form.Date === "") form.Date = getTodaysDate()

        const match = {
            "Id": 1,
            "Player1": {
                "Name": form.Player1,
                "Score": form.ScorePlayer1,
            },
            "Player2": {
                "Name": form.Player2,
                "Score": form.ScorePlayer2,
            },
            "Date": form.Date
        };

        postJSON(match);

        // console.log("match", match)
        // // Send the match data to the server
        // fetch('http://localhost:3001/data', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //       },
        //     body: JSON.stringify(match)
        // })
        // .then(response =>  {
        //     console.log('Response status:', response.status);
        //     return response.json();
        // })
        // .then(data => {
        //     // Update the state with the new match data
        //     setData([...data, data]);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
        // console.log("after", match)
    }



    async function postJSON(data) {
        try {
          const response = await fetch("http://localhost:3001/data", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify(data),
          });
      
          const result = await response.json();
          console.log("Success:", result);
        } catch (error) {
          console.error("Error:", error);
        }
      }

    const handleFormChangeEvent = (event) => {
        const { name, value } = event.target
        form = { ...form, [name]: value }
    }

    const getTodaysDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return (
        <div className="matches">
            <h2>Matches</h2>
            <div className='TableWrapper'>
                {data.length === 0 ? (
                    <div className="LoadingSpinner"></div>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Player 1</th>
                                    <th>Player 2</th>
                                    <th>Result</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.Id}>
                                        <td>{item.Player1.Name}</td>
                                        <td>{item.Player2.Name}</td>
                                        <td>{item.Player1.Score}:{item.Player2.Score}</td>
                                        <td>{item.Date}</td>
                                    </tr>
                                ))}
                                {showForm && <tr key="100">
                                    <td><input type='Text' name="Player1" onChange={handleFormChangeEvent} autoFocus /></td>
                                    <td><input type='Text' name="Player2" onChange={handleFormChangeEvent} /></td>
                                    <td>
                                        <div className='scoreInput'>
                                            <input type='Text' name="ScorePlayer1" onChange={handleFormChangeEvent} maxLength={1} />:
                                            <input type='Text' name="ScorePlayer2" onChange={handleFormChangeEvent} maxLength={1} />
                                        </div>
                                    </td>
                                    <td><input type='Text' name="Date" value={getTodaysDate()} onChange={handleFormChangeEvent} /></td>
                                </tr>}
                            </tbody>
                        </table>
                        {showAddButton && <button onClick={handleAddClick}>Add</button>}
                        {showConfirmButton && <button onClick={handleConfirmClick}>Confirm</button>}
                        {showCancelButton && <button onClick={handleCancelClick}>Cancel</button>}
                    </>
                )}
            </div>
        </div>
    )
}