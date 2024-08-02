/* eslint-disable react/prop-types */
import {Header} from './Header'
import {Content} from './Content'

export function Course ({ course }) {

    

    return(
        <>
        <Header course={course}/>

        <Content course={course}/>
        </>
    )
}