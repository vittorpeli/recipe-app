import { Router } from "express";
import 'dotenv/config';
import { createRecipe } from "./controllers/recipes-controller.js";

const route = Router(); 

route.get("/", (req, res) => {
  res.send("Hello World")
})

route.post("/recipes", createRecipe)

export default route;