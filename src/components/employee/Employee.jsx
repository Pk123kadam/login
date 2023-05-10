import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function Employee() {
    const [data, Setdata] = useState([])
    const [id, Setid] = useState(0)
    useEffect(() => {
        console.log("refresh")
        axios.get("http://localhost:3001/employee").then((res) => {
            Setdata(res.data.data)

        })

    }, [])
    return (<>


        <h1 className="text-center">employee list</h1>

        <button className="btn btn-success"><Link to="/create" style={{ color: "white", textDecoration: "none" }}>Add Employee</Link></button>

        <>

            {/* <img src={`http://localhost:3001/` + e.Image}></img> */}

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Sr no.</th>
                        <th scope="col">Image</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((e, i) => {
                        return <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td><img src={"http://localhost:3001/" + e.Image} className="rounded-circle w-25 h-25"></img></td>
                            <td>{e.Email}</td>
                            <td>{e.Address}</td>
                            <td><button className="btn btn-success"><Link to={`/updateemployee/` + e._id} style={{ textDecoration: 'none', color: "white" }}>Edit</Link></button> <button className="btn btn-danger" onClick={() => {
                                console.log("delete")

                                axios.delete("http://localhost:3001/delete/" + e._id)
                                window.location.reload(true)
                            }}>Delete</button></td>

                        </tr>
                    })}

                </tbody>
            </table>


        </>





    </>




    )
}
export default Employee