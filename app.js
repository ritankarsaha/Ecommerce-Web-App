import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"



const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import cartRouter from "./routes/cart.routes.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import orderRouter from "./routes/order.routes.js"

app.use("/api/carts", cartRouter)
app.use("/api/auth" ,  authRouter)
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter)


export { app }