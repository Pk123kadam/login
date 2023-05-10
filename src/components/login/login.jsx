import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./login.css"
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate()
    const [error, Seterror] = useState(false)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',


        },
        validationSchema: Yup.object({

            email: Yup.string()
                .required("Email is required")
                .email("Invalid email address"),
            password: Yup.string()
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

            fetch("http://localhost:3001/login", {
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
                console.log(res)
                if (res.status == 200) {
                    navigate("/")
                } else if (res.status == 400) {
                    Seterror(true)

                }



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
            <form onSubmit={formik.handleSubmit} id='login'>
                {error && <div className='text-danger'>invalid credentials</div>}
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email'

                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email} />
                    {formik.touched.email && formik.errors.email && (
                        <p>{formik.errors.email}</p>
                    )}
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password} />
                    {formik.touched.password && formik.errors.password && (
                        <p>{formik.errors.password}</p>)}
                </div>

                <div className="text-center">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </form>



        </>
    )
}

export default Login