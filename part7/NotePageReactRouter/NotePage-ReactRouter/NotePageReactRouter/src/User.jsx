import { useParams } from "react-router-dom"

export const User = () => {

    const params = useParams()
    console.log(params)

  return (
    <>
      <h1>User</h1>

      {params.id && <h2>Profile {params.id}</h2>}

    </>
  )
}