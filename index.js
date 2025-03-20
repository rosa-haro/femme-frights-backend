const express = require("express")
const moviesRouter = require("./src/routes/moviesRouter")
const loginRouter = require("./src/routes/loginRouter")
const usersRouter = require("./src/routes/usersRouter")
const cors = require("cors")

require("dotenv").config();
const connectToDatabase = require("./src/config/db")

const app = express();

app.use(cors())
connectToDatabase()

app.use(express.json())

app.use('/uploads', express.static('uploads'));

app.use("/movies", moviesRouter)
app.use("/", loginRouter)
app.use("/users", usersRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})