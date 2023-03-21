import { writeFile, mkdir, readFile } from "node:fs/promises";
import { get } from "node:https";
import shopStock from "./stock.js";
const DB_PATH = new URL("./../database/", import.meta.url).pathname;
const DB_NAME = "database.json";
const DB = DB_PATH + "/" + DB_NAME;

export const saveOrder = async function saveOrder(order) {
  order.item = shopStock[order.soldItemId];
  let dbData = await getDbData();
  order.status = "Ruošiamas";
  order.isNotSent = true;
  dbData.orders.push(order);
  return await writeData(JSON.stringify(dbData));
};

export const getOrders = async function () {
  let data = await getDbData();
  return data.orders;
};

const getDbData = async function () {
  try {
    return JSON.parse(await readFile(DB, "utf-8"));
  } catch (err) {
    console.log(err);
    return { orders: [] }; //if file empty or not created
  }
};

async function writeData(data) {
  await mkdir(DB_PATH, { recursive: true });
  await writeFile(DB, data);
}

export const completeOrder = async function (id) {
  let data = await getDbData();
  data.orders[id].status = "Išsiųstas";
  data.orders[id].isNotSent = "";
  return await writeData(JSON.stringify(data));
};
