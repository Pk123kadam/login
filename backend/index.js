import express from "express"
import dotenv from "dotenv"
import { employee_storage } from "./multer/multer"
import employee from "./model/employee"
dotenv.config()
import mongoose from "mongoose"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import userModel from "./model/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import multer from "multer"
import fs from "fs"
import path from "path"
const app = express()
app.use(express.static("user_images"))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(__dirname))
mongoose.connect(process.env.MONGO_URL).then(() => { console.log("connected to database") })
app.use(bodyParser.json())
var corsOptions = {
    origin: 'http://127.0.0.1:5173',


    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.post("/emploginn", async (req, res) => {
    try {
        const { Email, Password } = req.body

        const user = await employee.findOne({ Email: Email })

        console.log(user)
        if (user) {
            const match = await bcrypt.compare(Password, user.Password)
            console.log("done")

            if (match) {
                const token = jwt.sign({ user }, "secret")
                console.log(token)
                return res
                    .cookie("access_token", token, { sameSite: "none", secure: true }).status(200)
                    .json({ message: "success", user: user });

            } else {
                return res.status(404).json({
                    message: "user not found"
                })
            }

        } else {
            res.status(400).json({
                message: "something went wrong"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email)
        const user = await userModel.findOne({ email: email, password: password })
        console.log(user)
        if (user) {
            console.log("done")

            const token = jwt.sign({ user }, "secret")
            console.log(token)
            return res
                .cookie("access_token", token, { sameSite: "none", secure: true }).status(200)
                .json({ message: "success" });


        } else {
            res.status(400).json({
                message: "something went wrong"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

app.get("/logout", (req, res) => {
    try {
        console.log(req.cookies)

        res.clearCookie('access_token', { sameSite: "none", secure: true })
        res.end()





    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})
app.get("/emp", vali, async (req, res) => {
    try {
        const data = await employee.findOne({ _id: req.id })
        console.log(data)
        if (data) {
            return res.status(200).json({
                data: data,
                message: "successfully fetched"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }





    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})
function vali(req, res, next) {

    try {
        console.log("cookie")
        console.log(req.cookies)

        if (req.cookies.access_token) {


            const token = req.cookies.access_token
            console.log(token)

            let decode = jwt.verify(token, "secret")
            console.log(decode)
            req.id = decode.user._id

            if (decode) {
                next()
            }
        } else {
            console.log("hi")
            return res.status(401).json({
                message: "unauthorized"

            })
        }
    } catch (err) {
        return res.status(500).json(
            { message: err.message }
        )
    }
}
app.get("/dash", vali, (req, res) => {
    return res.status(200).json({
        message: "success"
    })
})

app.post('/create', (req, res) => {
    try {
        const upload = multer({ storage: employee_storage })
        const uploadData = upload.single("image")

        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            const { Email, Password, Address } = req.body
            console.log(req.body)
            console.log(req.file)

            const image = req.file.filename
            const hashPassword = bcrypt.hashSync(Password, 10);

            const add = new employee({
                Email, Password: hashPassword, Image: image, Address

            })

            const save = add.save()
            if (save) {
                return res.status(201).json({
                    data: add,
                    message: "successfully created"
                })
            } else {
                return res.status(400).json({
                    message: "something went wrong"
                })
            }


        })


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
app.get("/employee", async (req, res) => {
    try {
        const data = await employee.find()
        if (data) {
            return res.status(200).json({
                data: data,
                message: "successfully fetched"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })

    }
})

app.get("/employee/:ids", async (req, res) => {
    try {

        const data = await employee.findOne({ _id: req.params.ids })
        if (data) {
            return res.status(200).json({
                data: data,
                message: "successfully fetched"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }

    } catch (err) {
        return res.status(500).json({

            message: err.message
        })
    }
})
app.get("/upemployee", vali, async (req, res) => {
    try {
        console.log(req.id)

        const data = await employee.findOne({ _id: req.id })

        if (data) {
            return res.status(200).json({
                data: data,
                message: "successfully fetched"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }

    } catch (err) {
        return res.status(500).json({

            message: err.message
        })
    }
})
app.patch('/update/:ids', async (req, res) => {
    try {

        const { Email, Password, Address } = req.body
        console.log(req.body)
        console.log(req.file)




        const add = await employee.updateOne({ _id: req.params.ids }, {
            $set: {
                Email, Password, Address
            }
        })



        if (add) {
            return res.status(201).json({
                data: add,
                message: "successfully updated"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }





    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
app.patch('/updateee', vali, async (req, res) => {
    try {

        const { Email, Password, Address } = req.body
        console.log(req.body)
        console.log(req.file)




        const add = await employee.updateOne({ _id: req.id }, {
            $set: {
                Email, Password, Address
            }
        })



        if (add) {
            return res.status(201).json({
                data: add,
                message: "successfully updated"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }





    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
app.delete("/delete/:ids", async (req, res) => {
    try {
        const img = await employee.findOne({ _id: req.params.ids })
        fs.unlinkSync(`user_images/${img.Image}`)
        const data = await employee.deleteOne({ _id: req.params.ids })


        if (data) {
            return res.status(200).json({
                data: data,
                message: "successfully deleted"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }

    } catch (err) {
        return res.status(500).json({

            message: err.message
        })
    }

})
app.delete("/dell", vali, async (req, res) => {
    try {
        const img = await employee.findOne({ _id: req.id })
        fs.unlinkSync(`user_images/${img.Image}`)
        const data = await employee.deleteOne({ _id: req.id })


        if (data) {
            return res.status(200).json({
                data: data,
                message: "successfully deleted"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }

    } catch (err) {
        return res.status(500).json({

            message: err.message
        })
    }

})




app.listen(process.env.PORT || 6001, () => {
    console.log(`connected to port ${process.env.PORT}`)
})