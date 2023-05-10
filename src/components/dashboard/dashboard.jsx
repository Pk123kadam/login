import axios from "axios"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate()
    useEffect(() => {


        // axios.get("http://localhost:3001/dash", { withCredentials: true }).then((res) => {
        //     console.log(res
        //     )
        //     if (res.data.message == "success") {
        //         console.log("un")

        //     } else {
        //         navigate("/login")

        //     }

        // })
        fetch("http://localhost:3001/dash", {
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
            if (res.status == 200) {

            } else {
                navigate("/start")
            }



        }).catch((err) => {
            if (err) {
                console.log(err)
                Seterror(true)
            }



        })

    }


        , [])
    return (
        <>
            <div class="container-fluid">

                <div class="row flex-nowrap">
                    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">

                        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span class="fs-5 d-none d-sm-inline">Menu</span>
                            </a>
                            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li class="nav-item">
                                    <Link to="/home" href="#" class="nav-link align-middle px-0">
                                        <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>

                                    </Link>
                                </li>

                                <li>
                                    <Link to="/employees" href="#" class="nav-link px-0 align-middle">
                                        <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Manage Employees</span></Link>
                                </li>


                                <li>
                                    <Link to="/profile" href="#" class="nav-link px-0 align-middle">
                                        <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Profile</span> </Link>
                                </li>

                                <li>
                                    <button onClick={
                                        () => {

                                            // axios.get("http://localhost:3001/logout", { withCredentials: true }).then((res) => {
                                            //     console.log(res)
                                            //     navigate("/login")
                                            // }).catch((err) => {
                                            //     console.log(err)
                                            // })
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

                                        }


                                    }>
                                        <Link to="/logout" href="#" class="nav-link px-0 align-middle">
                                            <i class="fs-4 bi-power"></i> <span class="ms-1 d-none d-sm-inline">logout</span> </Link>
                                    </button>
                                </li>
                            </ul>
                            <hr />

                        </div>
                    </div>
                    <div class="col py-3">

                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard