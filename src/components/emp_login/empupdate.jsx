import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';



function EmpUpdate() {
    const [data, setData] = useState(null)


    const navigate = useNavigate()

    useEffect(() => {
        console.log("ko")
        // axios.get('http://localhost:3001/upemployee').then((res) => {
        //     console.log(res)
        //     setData(res.data.data)


        // })

        fetch("http://localhost:3001/upemployee", {
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
            return res.json()

        }).then((data) => {
            setData(data.data)

        }).catch((err) => {
            if (err) {
                console.log(err)
                Seterror(true)
            }



        })

    }, [])
    console.log(data)


    const formik = useFormik({
        initialValues: {
            Email: '',

            Address: '',


        },
        validationSchema: Yup.object({

            Email: Yup.string()
                .required("Email is required")
                .email("Invalid email address"),


            Address: Yup.string().required("Address is required")




        }),

        onSubmit: (values, { resetForm }) => {

            // alert(JSON.stringify(values, null, 2));
            // const formData = new FormData();
            // formData.append('Email', values.Email);
            // formData.append('Password', values.Password);
            // formData.append('Address', values.Address);
            // formData.append('image', values.image);
            // axios.patch("http://localhost:3001/updateee", values).then((res) => {
            //     console.log(res)



            // }).catch((err) => {
            //     console.log(err)

            // })
            fetch("http://localhost:3001/updateee", {
                method: "PATCH",
                mode: 'cors',
                credentials: 'include',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values)


            }

            ).then((res) => {
                if (res.status == 201) {
                    navigate("/empdetail")
                }

            }).catch((err) => {
                if (err) {
                    console.log(err)
                    Seterror(true)
                }



            })




        },


    });
    useEffect(() => {
        if (data) {
            formik.setValues({
                Email: data.Email,

                Address: data.Address,
            });
        }
    }, [data]);
    return (
        <>

            <form className="w-50 m-auto" onSubmit={formik.handleSubmit}
                encType="multipart/form-data" >
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" name="Email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Email} />
                    {formik.touched.Email && formik.errors.Email && (
                        <p>{formik.errors.Email}</p>
                    )}

                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword2" class="form-label">Address</label>
                    <input type="text" name="Address" class="form-control" id="exampleInputPassword2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Address} />
                    {formik.touched.Address && formik.errors.Address && (
                        <p>{formik.errors.Address}</p>
                    )}
                </div>

                <div className="text-center"> <button type="submit" class="btn btn-primary">Update</button></div>
            </form>


        </>
    )
}

export default EmpUpdate