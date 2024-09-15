/* eslint-disable react/prop-types */
import { DeleteBtn } from "./DeleteBtn"


export function Persons ({ persons, handleDelete }) {


    return(
        <ul style={{listStyle: 'none'}}>
            {persons.map((person) =>
            <li key={person._id}>
                <p><span style={{color: "yellow"}}>{person.name}</span> {person.number} <DeleteBtn handleDelete={() => handleDelete(person._id)}/></p>
            </li>
            )}
        </ul>
    )
}