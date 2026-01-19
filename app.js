const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const UserRoter = require("./router/Usr.Router")
const NoteRouter = require("./router/Note.router");
const cors = require('cors')

app.use(cors())
app.use(express.json());


main()
  .then((res) => {
    console.log("Connection Successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test20");
}

app.use("/",UserRoter);
app.use("/",NoteRouter)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
