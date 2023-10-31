import React from 'react';
import './Matches.css'

export default function Matches({ data, setData }) {

    const [showForm, setShowForm] = React.useState(false);
    const [showAddButton, setShowAddButton] = React.useState(true);

    const handleClick = () => {
        setShowAddButton(false)
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
            <h2>Matches</h2>
            <div className='TableWrapper'>
                <table>
                    <thead>
                        <tr>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.Id}>
                                <td>{item.Player1}</td>
                                <td>{item.Player2}</td>
                                <td>{item.Score}</td>
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

        const match = {};

        formArray.forEach((innerArray) => {
            const key = innerArray[0];
            const value = innerArray[1];
            match[key] = value;
        });

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
};