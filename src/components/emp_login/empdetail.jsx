import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function EmpDetail() {
    const navigate = useNavigate()

    const [data, setData] = useState({})
    useEffect(() => {
        // axios.get("http://localhost:3001/emp").then((data) => {
        //     console.log(data.data.data)
        //     setData(data.data.data)
        // })
        fetch("http://localhost:3001/emp", {
            method: "GET",
            mode: 'cors',
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },


        }

        ).then((res) => {
            return res.json()


        }).then((data) => {
            setData(data.data)
        }).catch((err) => {
            if (err) {
                console.log(err)

            }



        })
    }, [])
    return (

        <>
            <img src={"http://localhost:3001/" + data.Image} className="rounded-circle" ></img>
            <h1>{data.Email}</h1>
            <h1>{data.Address}</h1>
            <button className="btn btn-danger" onClick={() => {
                fetch("http://localhost:3001/logout", {
                    method: "GET",
                    mode: 'cors',
                    credentials: 'include',

                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },


                }

                ).then((res) => {
                    console.log(res)
                    navigate("/start")

                }).catch((err) => {
                    if (err) {
                        console.log(err)

                    }



                })

            }}>logout</button>
            <button><Link to="/empupdate">update</Link></button>
            <button className="btn btn-danger" onClick={() => {
                fetch("http://localhost:3001/dell", {
                    method: "DELETE",
                    mode: 'cors',
                    credentials: 'include',

                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },


                }

                ).then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        fetch("http://localhost:3001/logout", {
                            method: "GET",
                            mode: 'cors',
                            credentials: 'include',

                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },


                        }

                        ).then((res) => {
                            console.log(res)
                            navigate("/start")

                        }).catch((err) => {
                            if (err) {
                                console.log(err)
                                Seterror(true)
                            }



                        })
                        navigate("/start")


                    }



                }).catch((err) => {
                    if (err) {
                        console.log(err)

                    }



                })

            }}>delete</button>


        </>
    )
}

export default EmpDetail