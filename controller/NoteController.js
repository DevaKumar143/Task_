const Note = require("../models/Note");


exports.AllNotes = async (req, res) => {
  try {
    const AllNote = await Note.find({});
    res.json({ AllNote });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
}

exports.CreateNote =  async (req, res) => {
  try {
    const { name, description, location, image, gender, Create } = req.body;
    const note = new Note({
      name,
      description,
      location,
      image,
      gender,
      Create,
      user: req.user.id,
    });
    const savednote = await note.save();
    res.json({ savednote });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
}

exports.show = async (req, res) => {
  try {
    const note = await Note.find({ _id: req.params.id });
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server ");
  }
}

exports.Update = async (req, res) => {
  try {
    const { name, description, location, image, gender, Create } = req.body;
    const newNote = {};

    if (name) {
      newNote.name = name;
    }
    if (description) {
      newNote.description = description;
    }
    if (location) {
      newNote.location = location;
    }
    if (image) {
      newNote.image = image;
    }
    if (gender) {
      newNote.gender = gender;
    }
    if (Create) {
      newNote.Create = Create;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(402).send("Not Authorized");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    return res.json({ note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("InternallServer ");
  }
}

exports.Delete =  async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(402).send("Not Authorized");
    }

    note = await Note.findByIdAndDelete(req.params.id, { new: true });
    return res.json({ note });
  } catch (error) {
    console.log(error.message);
  }
}