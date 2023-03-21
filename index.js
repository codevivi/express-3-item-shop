import express from "express";
import { engine } from "express-handlebars";
import { saveSoldItemById, saveOrder, getDbData } from "./src/db.js";
import shopStock from "./src/stock.js";
console.log(shopStock);
const PORT = 5000;

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("shop", { shopStock });
});

app.get("/order/:id", (req, res) => {
  console.log(req.params.id, "id id id ");
  let id = Number(req.params.id);
  let item = shopStock[id];
  item.id = Number(id);
  console.log(id, item, "blalkbjlal blj makaronai");
  let paid = req.query.paid ? true : false;
  let failure = req.query.failure ? true : false;
  let needPayment = paid ? false : true;
  res.render("order", { item, needPayment, paid, failure });
});

app.post("/order", async (req, res) => {
  let failure = "";
  let paid = "";
  console.log;
  try {
    await saveOrder(req.body);
    await saveSoldItemById(req.body.soldItemId);
    paid = true;
  } catch (e) {
    console.log(e);
    failure = true;
  }
  console.log(req.body.soldItemId, "bla bla lb a");
  res.redirect(`/order/${req.body.soldItemId}/?paid=${paid}&failure=${failure}`);
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
