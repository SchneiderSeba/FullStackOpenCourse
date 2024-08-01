/* eslint-disable react/prop-types */


export function VoteData ({ totalVotes }) {


    return(
        <table border="1">
      <thead>
        <tr>
          <th>VOTES</th>
        </tr>
      </thead>
      <tbody>
        
          <tr>
            <td>{totalVotes}</td>
          </tr>

      </tbody>
    </table>
    )
}