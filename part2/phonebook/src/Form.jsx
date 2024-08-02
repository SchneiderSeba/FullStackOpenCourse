/* eslint-disable react/prop-types */
import { AddBtn } from "./AddBtn"

export function Form ({ handleSubmit, handleChangeName, setPersons, setNewName, newName, handleChangeNumber }) {
    return(

        <form onSubmit={handleSubmit}>

        <div>
          Name: <input type="text" onChange={handleChangeName} />
        </div>

        <div>
          Number: <input type="tel" onChange={handleChangeNumber} required/>
        </div>

        <div>
          <AddBtn setPersons={setPersons} setNewName={setNewName} newName={newName}/>
        </div>

      </form>
    )
}