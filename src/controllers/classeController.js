const Classe = require("../models/Classe");

exports.createClasse = async (req, res) => {
  try {
    const { ClassName, teacher, students } = req.body;

    let existingClass = await Classe.findOne();

    if (existingClass) {
      existingClass.ClassName = ClassName;
      existingClass.teacher = teacher;
      existingClass.students = students;

      const updatedClasse = await existingClass.save();
      res.status(200).json(updatedClasse);
    } else {
      const newClasse = new Classe({
        ClassName,
        teacher,
        students,
      });

      const savedClasse = await newClasse.save();
      res.status(201).json(savedClasse);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to create/update class." });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Classe.find().populate("teacher students");

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch classes." });
  }
};
