import './Stats.css'

export default function Stats({ data }) {
    return (
        <div className="Stats">
            <h2>Stats</h2>
            <table>
                <thead>
                    <tr>
                        {/* <th>Date</th> */}
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Win</th>
                        <th>Loses</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={item.Id}>
                        <td>{index + 1}</td>
                        <td>{item.Player1}</td>
                        <td>{item.Player2}</td>
                        <td>{item.Score}</td>
                    </tr>
                ))}
                 </tbody>
            </table>
        </div>
    )
}