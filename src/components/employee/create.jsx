import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            Email: '',
            Password: '',
            Address: '',
            image: null


        },
        validationSchema: Yup.object({

            Email: Yup.string()
                .required("Email is required")
                .email("Invalid email address"),
            Password: Yup.string()
                .required("Password is required")
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password is not valid').required('Required'),

            Address: Yup.string().required("Address is required")




        }),

        onSubmit: (values, { resetForm }) => {

            // alert(JSON.stringify(values, null, 2));
            const formData = new FormData();
            formData.append('Email', values.Email);
            formData.append('Password', values.Password);
            formData.append('Address', values.Address);
            formData.append('image', values.image);
            axios.post("http://localhost:3001/create", formData).then((res) => {
                if (res.status == 201) {
                    navigate("/employees")

                }


            }).catch((err) => {
                console.log(err)

            })



        },


    });
    return (
        <>
            <h1 className="text-center mb-5">Add Employees</h1>

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
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input name="Password" class="form-control" id="exampleInputPassword1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Password} />
                    {formik.touched.Password && formik.errors.Password && (
                        <p>{formik.errors.Password}</p>
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
                <div class="mb-3">
                    <label for="exampleInput" class="form-label">Select image</label>
                    <input type="file" class="form-control" id="exampleInput" name="image"
                        onChange={(event) => {
                            console.log(event.target.files[0])
                            formik.setFieldValue('image', event.target.files[0]);
                        }} />
                </div>



                <div className="text-center"> <button type="submit" class="btn btn-primary">Add</button></div>
            </form>
        </>
    )
}

export default Create