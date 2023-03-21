import express from "express";
import { engine } from "express-handlebars";
import { saveOrder, getOrders, completeOrder } from "./src/db.js";
import shopStock from "./src/stock.js";
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
  let id = Number(req.params.id);
  let item = shopStock[id];
  let paid = req.query.paid ? true : false;
  let failure = req.query.failure ? true : false;
  let needPayment = paid ? false : true;
  res.render("order", { item, itemId: id, needPayment, paid, failure });
});

app.post("/order", async (req, res) => {
  let failure = "";
  let paid = "";
  try {
    await saveOrder(req.body);
    paid = true;
  } catch (e) {
    console.log(e);
    failure = true;
  }
  res.redirect(`/order/${req.body.soldItemId}/?paid=${paid}&failure=${failure}`);
});

app.get("/manager", async (req, res) => {
  let orders = await getOrders();
  res.render("manager", { orders });
});

app.get("/manager/send/order/:id", async (req, res) => {
  completeOrder(req.params.id);
  res.redirect("/manager");
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
