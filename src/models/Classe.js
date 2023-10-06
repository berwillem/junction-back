const mongoose = require("mongoose");

const ClasseSchema = new mongoose.Schema({
  ClassName: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Classe = mongoose.model("Classe", ClasseSchema);

module.exports = Classe;
