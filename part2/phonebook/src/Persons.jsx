/* eslint-disable react/prop-types */

export function Persons ({ persons }) {
    return(
        <ul style={{listStyle: 'none'}}>
            {persons.map((persons) =>
            <li key={persons.id}>
                <p><span style={{color: "yellow"}}>{persons.name}</span> {persons.number}</p>
            </li>
                
)}
        </ul>
    )
}