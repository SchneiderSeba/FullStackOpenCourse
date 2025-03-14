import { Link } from "react-router-dom"
import { User } from "./User"

export const ProfilePage = () => {

    return (
        <>
        <h1>Profile Page</h1>

        <Link to="/">Home</Link>
        <br />
        <Link to="/profiles">Profiles</Link>

        <User />

        </>
    )
}