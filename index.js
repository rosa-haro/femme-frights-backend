const express = require("express")
const moviesRouter = require("./src/routes/moviesRouter")
const loginRouter = require("./src/routes/loginRouter")
const usersRouter = require("./src/routes/usersRouter")
const cors = require("cors")
const path = require("path"); 

require("dotenv").config();
const connectToDatabase = require("./src/config/db")

const app = express();

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? "https://femme-frights-demo.vercel.app"  
      : "http://localhost:5173",  
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'auth-token'],
  };

app.use(cors(corsOptions))
connectToDatabase()

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/movies", moviesRouter)
app.use("/", loginRouter)
app.use("/users", usersRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})