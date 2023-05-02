import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const MONGODB_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.jerkvby.mongodb.net/test`;

connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(MONGODB_URI);
  });
