import React from 'react';
import './Matches.css'

export default function Matches({ data, setData }) {

    const [showForm, setShowForm] = React.useState(false);
    const [showAddButton, setShowAddButton] = React.useState(true);

    const handleClick = () => {
        setShowAddButton(false)
        setShowForm(true)
    }

    return (
        <div className="Matches">
            <h2>Matches</h2>
            <div className='TableWrapper'>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.Id}>
                                <td>{item.Date}</td>
                                <td>{item.Player1.Name}</td>
                                <td>{item.Player2.Name}</td>
                                <td>{item.Player1.Score}:{item.Player2.Score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showAddButton && <button onClick={handleClick}>Add</button>}
                {showForm && <Form setShowForm={setShowForm} setShowAddButton={setShowAddButton} setData={setData} data={data} />}
            </div>
        </div>
    )
}

const Form = ({ setShowForm, setShowAddButton, setData, data }) => {

    const handleCancelClick = () => {
        setShowForm(false);
        setShowAddButton(true)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const formArray = [...form.entries()]

        console.log(formArray)
        


        const match = {
            "Player1": 
              { 
                "Name": formArray[0][1],
                "Score": formArray[2][1].charAt(0), 
              },
                "Player2": 
        	    { 
                "Name": formArray[1][1],
                "Score": formArray[2][1].charAt(2), 
               },
             "Date" :"2023-11-04"
        };

        console.log(match)

        // formArray.forEach((innerArray) => {
        //     const key = innerArray[0];
        //     const value = innerArray[1];
        //     match[key] = value;
        // });

        setData([...data, match])

        setShowForm(false)
        setShowAddButton(true)
    }

    return (
        <>
            <form onSubmit={handleSubmitForm}>
                <input type="text" name="Player1" />
                <input type="text" name="Player2" />
                <input type="text" name="Score" />
                <input type="submit" value="Submit" />
            </form>
            <button onClick={handleCancelClick}>Cancel</button>
        </>
    );


    function GetTodaysDate(){

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
};