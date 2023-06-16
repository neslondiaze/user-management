import userRouter from "#Routes/user.routes.js";
import  express  from "express";

const expressApp = express();

// TODO MiddLemares
expressApp.use(express.json())



// TODO  Routes...
expressApp.use('/user', userRouter)


export default expressApp;