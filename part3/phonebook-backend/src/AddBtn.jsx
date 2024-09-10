/* eslint-disable react/prop-types */

export function AddBtn ({ handleSubmit }) {
    
    return(
        <button type="submit"
                onSubmit={handleSubmit}>Add</button>
    )
}