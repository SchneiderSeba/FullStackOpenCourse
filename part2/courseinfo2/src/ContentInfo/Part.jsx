/* eslint-disable react/prop-types */

export function Part ({ course }) {

    const NameCourse = ({ name }) => {
        return(
            <h2>{name}</h2>
        )
    }

    const InfoCourse = ({ parts }) => {
        return(
            <>
            {parts.map(part => 
                <div key={part.id}>
                    <p><strong>{part.name}</strong> {part.exercises}</p>
                </div>
            )}
            </>
        )
    }

    const Total = ({ parts }) => {

        // console.log(allParts)

        const total = parts.reduce((a, c) => {
    
            return  a + c.exercises 
          }, 0)
    
        return(
            <h2><strong>Number of exercises {total}</strong></h2>
        )
    }
    
    return(
        <div>
            <ul style={{listStyle: 'none'}}>
            {course.map(course => 
                <li key={course.id}>
                    <NameCourse name={course.name}/>
                    <InfoCourse parts={course.parts}/>
                    <Total parts={course.parts}/>
                </li>
            )}
            </ul>
        </div>
    )
}