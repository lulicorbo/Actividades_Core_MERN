import { User } from "../modelos/users.modelo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

const userController = {
  getAll: async (req, res) => {
    try {
      const allUsers = await User.find();
      return res.status(200).json(allUsers);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  createOne: async (req, res) => {
    const { firstName, lastName, email, password, passwordConfirmation } =
      req.body;
    const newArray = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
    };
    try {
      const newUser = await User.create(newArray);

      const saveToken = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        id: newUser._id,
      };
      //el secret del .env
      jwt.sign(saveToken, SECRET, { expiresIn: "1m" }, (err, token) => {
        //callback
        if (err) {
          return res.status(500).json({ message: "Error al generar token" });
        }
        return res.status(201).json({ token });
      }); //retorna token valido
    } catch (e) {
      if (e && e.code === 11000) {
        return res
          .status(400)
          .json({ errors: { email: "El email ya está registrado" } });
      }
      if (e.name === "ValidationError") {
        const messages = {};
        Object.keys(e.errors).forEach((key) => {
          messages[key] = e.errors[key].message;
        });
        return res.status(400).json({ errors: { ...messages } });
      }
      return res
        .status(500)
        .json({ message: "Error al crear usuario", details: e?.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return res.status(404).json({ errors: { email: "El email no existe" } });
    }
    const bcryptResponse = await bcrypt.compare(password, currentUser.password);

    if (!bcryptResponse) {
      //compara con clave encriptada
      return res
        .status(401)
        .json({ errors: { password: "Las credenciales están mal" } });
    }

    const saveToken = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      id: currentUser._id,
    };
    jwt.sign(saveToken, SECRET, { expiresIn: "1m" }, (err, token) => {
      return res.status(201).json({ token });
    });
  },
};
export default userController;
