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
                            <td>Test this </td>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                            </tr>}
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
            "Date": formArray[3][1]
        };

        setData([...data, match])

        setShowForm(false)
        setShowAddButton(true)
    }

    return (
        <div className='matchInputWrapper'>
            <form onSubmit={handleSubmitForm}>
                <div className='textInputContainer'>
                    <input type="text" name="Player1" />
                    <input type="text" name="Player2" />
                    <input type="text" name="Score" />
                    <input type="text" value={GetTodaysDate()} name="Date" />
                </div>
                <div className='buttonInputContainer'>
                    <input type="submit" value="Submit" />
                    <input type="cancel" onClick={handleCancelClick} value="Cancel" />
                </div>
            </form>
        </div>
    );

    function GetTodaysDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
};