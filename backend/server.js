const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { Sequelize } = require("sequelize");
var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.use(express.json());
const sequelize = new Sequelize("testdb", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

const Users = require("../backend/models/model")(sequelize, Sequelize);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

Users.sync({ alter: true });

app.post("/users", (req, res) => {
  const { user_id, firstName, lastName, age, email, phoneno, is_deleted } =
    req.body;
  const create = Users.create(req.body)
    .then((data) => {
      res.status(200).json(req.body);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

app.get("/getuser", (req, res) => {
  return Users.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.get("/getOneUser/:id", (req, res) => {
  const id = req.params.id;
  return Users.findByPk(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  return Users.update(req.body, { where: { user_id: id } })
    .then((data) => {
      res.status(200).json("user is updated");
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  return Users.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(500).json({ message: "User Not Found" });
      }
      req.body.is_deleted = true;
      Users.update(req.body, { where: { user_id: id } });
      return res.status(200).json("user is deleted");
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
