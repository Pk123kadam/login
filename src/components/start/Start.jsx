
import { useNavigate } from "react-router-dom"

function Start() {
    const navigate = useNavigate()
    return (
        <>
            <h1>login as</h1>
            <button className="btn btn-primary" onClick={() => { navigate("/login") }}>admin</button>
            <button className="btn btn-primary" onClick={() => { navigate("/emplogin") }}>employee</button>





        </>
    )
}

export default Start