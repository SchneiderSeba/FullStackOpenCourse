/* eslint-disable react/prop-types */


export function Statistics ({ good, bad, neutral, total }) {

    const positive = total ? ((good / total) * 100).toFixed(2) : 0
    const average = total ? (good / total).toFixed(2) : 0

    const data = [
        { column1: 'Good', column2: good },
        { column1: 'Neutral', column2: neutral },
        { column1: 'Bad', column2: bad },
        { column1: 'Total', column2: total },
        { column1: 'Average Good', column2: average },
        { column1: 'Positive ', column2: `${positive} %` }
    ]

    return(
        <table border="1">
      <thead>
        <tr>
          <th>DATA</th>
          <th>NUMBERS</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.column1}</td>
            <td>{row.column2}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )
}