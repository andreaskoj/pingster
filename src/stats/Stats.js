import './Stats.css'

export default function Stats({ data }) {
    return (
        <div className="Stats">
            Stats
            <table>
                <tr>
                    <th>Name</th>
                    <th>Wins</th>
                    <th>Loses</th>
                </tr>
                {data.map((item) => (
                    <tr key={item.Id}>
                        <td>{item.Player1}</td>
                        <td>{item.Player2}</td>
                        <td>{item.Score}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}