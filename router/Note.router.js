const { Router } = require("express");
const Auth = require("../middleware/Auth");
const router = Router();
const {AllNotes, CreateNote, show, Update, Delete} = require("../controller/NoteController")

router.get("/allnote", AllNotes);

router.post("/create", Auth, CreateNote);

router.get("/show/:id", Auth, show);

router.put("/update/:id", Auth,Update );

router.delete("/delete/:id", Auth, Delete);

module.exports = router;