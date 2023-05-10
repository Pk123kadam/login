import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function EmpLogin() {

    const navigate = useNavigate()
    const [error, Seterror] = useState(false)


    const formik = useFormik({
        initialValues: {
            Email: '',
            Password: '',


        },
        validationSchema: Yup.object({

            Email: Yup.string()
                .required("Email is required")
                .email("Invalid email address"),
            Password: Yup.string()
                .required("Password is required")
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password is not valid').required('Required')




        }),

        onSubmit: (values) => {

            // alert(JSON.stringify(values, null, 2));
            //     axios.post("http://localhost:3001/login", values).then((res) => {
            //         console.log(res)
            //         if (res.data.message == "success") {
            //             navigate("/")
            //         }

            //     }).catch((err) => {
            //         if (err) {
            //             console.log(err)
            //             Seterror(true)
            //         }
            //     })


            // },

            fetch("http://localhost:3001/emploginn", {
                method: "POST",
                mode: 'cors',
                credentials: 'include',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values)

            }

            ).then((res) => {
                return res.json()

                // console.log(res)
                // if (res.status == 200) {
                //     navigate("/")
                // }



            }).then((data) => {
                console.log(data)

                navigate("/empdetail")

            }).catch((err) => {
                if (err) {
                    console.log(err)
                    Seterror(true)
                }



            })

        }


    });
    return (

        <>
            <h1>employee login</h1>
            <form onSubmit={formik.handleSubmit} id='login'>
                {error && <div className='text-danger'>invalid credentials</div>}
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email'

                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Email} />
                    {formik.touched.Email && formik.errors.Email && (
                        <p>{formik.errors.Email}</p>
                    )}
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name='Password'
                        onChange={formik.handleChange}
                        value={formik.values.Password} />
                    {formik.touched.Password && formik.errors.Password && (
                        <p>{formik.errors.Password}</p>)}
                </div>

                <div className="text-center">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>



        </>
    )
}

export default EmpLogin