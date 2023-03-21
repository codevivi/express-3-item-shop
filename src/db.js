import { writeFile, mkdir, readFile } from "node:fs/promises";
import shopStock from "./stock.js";
const DB_PATH = new URL("./../database/", import.meta.url).pathname;
const DB_NAME = "database.json";
const DB = DB_PATH + "/" + DB_NAME;

export const saveOrder = async function saveOrder(order) {
  let dbData = await getDbData();
  dbData.orders.push(order);
  return await writeData(JSON.stringify(dbData));
};

export const saveSoldItemById = async function saveSoldItem(id) {
  let dbData = await getDbData();
  dbData.soldItems.push(shopStock[id]);
  return await writeData(JSON.stringify(dbData));
};

export const getDbData = async function () {
  try {
    return JSON.parse(await readFile(DB, "utf-8"));
  } catch (err) {
    console.log(err);
    return { orders: [], soldItems: [] }; //if file empty or not created
  }
};

async function writeData(data) {
  await mkdir(DB_PATH, { recursive: true });
  await writeFile(DB, data);
}
