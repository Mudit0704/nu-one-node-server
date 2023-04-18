import * as usersDao from "./users-dao.js";
import * as foodRestaurantDao from "../food/food-restaurant-dao.js";


const AuthController = (app) => {
  const register = async (req, res) => {
    const username = req.body.username;
    const user = await usersDao
    .findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = await usersDao
    .createUser(req.body);
    if(req.body.role === "foodAdmin") {
      const newRestaurant = {
        name: req.body.name,
        ownerId: newUser._id,
        address: req.body.address,
        description: req.body.description,
        average_ratings: 0,
        image: "logo192.png", //TODO: Replace this
        menu_items: []
      }
      await foodRestaurantDao.createRestaurant(newRestaurant)
    }
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login    = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao
    .findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile  = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout   = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update   = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    const updatedUser = await usersDao
    .updateUser(currentUser._id, req.body);
    req.session["currentUser"] = updatedUser;
    res.json(updatedUser);
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login",    login);
  app.post("/api/users/profile",  profile);
  app.post("/api/users/logout",   logout);
  app.put("/api/users", update);
};

export default AuthController;