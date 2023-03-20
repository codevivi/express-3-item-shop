import express from "express";
import { engine } from "express-handlebars";
import { saveData, getData } from "./src/db.js";
const PORT = 5000;

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  //   let posts = await getData();
  //   console.log(posts);
  res.render("shoping-cart");
});

app.get("/pirkti/:id/:name", async (req, res) => {
  //   let posts = await getData();
  //   console.log(posts);
  let message = req.query.message ? req.query.message : "";
  let errorMsg = req.query.errorMsg ? req.query.errorMsg : "";
  let needPayment = "";
  if (message) needPayment = false;
  res.render("pirkti", { id: req.params.id, name: req.params.name, message, needPayment });
});
app.post("/apmokejimas", async (req, res) => {
  console.log(req.body);
  await saveData(req.body);
  //   res.send("bla");

  res.redirect(`/pirkti/${req.body.prekesId}/${req.body.preke}/?message=Prekes bus pristatytos per 3 darbo dienas`);
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
