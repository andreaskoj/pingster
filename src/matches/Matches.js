import React from 'react';
import './Matches.css'

export default function Matches({ data, setData }) {

    const [showForm, setShowForm] = React.useState(false);

    const handleClick = () => {
        // let match = {
        //     "Id": 3,
        //     "Player1": "Test1",
        //     "Player2": "Test2",  
        //     "Score": "3:2",
        //   }

        //   setData([...data, match])'
        setShowForm(true)
    }

    return (
        <div className="Matches">
            Matches
            <table>
                <thead>
                    <tr>
                        {/* <th>Date</th> */}
                        <th>Player 1</th>
                        <th>Player 2</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.Id}>
                            <td>{item.Player1}</td>
                            <td>{item.Player1}</td>
                            <td>{item.Player2}</td>
                            <td>{item.Score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleClick}>Add</button>
            {showForm && <Form setShowForm = {setShowForm}  />}
        </div>
    )
}

const Form = ({ setShowForm }) => {

    const handleCancelClick = () => {
        setShowForm(false);
    }


    const handleSubmitForm = (e) => {

        e.preventDefault();

        const data = new FormData(e.target);
        console.log([...data.entries()]);

        const formData = {

        }
    }

    return (
        <>
            <form onSubmit={handleSubmitForm}>
                <input type="text" name="player1" />
                <input type="text" name="player2" />
                <input type="score" name="player2" />
                <input type="submit" value="Submit" />
            </form>
            <button onClick={handleCancelClick}>Cancel</button>
        </>
    );
};