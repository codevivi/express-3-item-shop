import { writeFile, mkdir, readFile } from "node:fs/promises";
const DB_PATH = new URL("./../database/", import.meta.url).pathname;
const DB_NAME = "orders.json";
const DB = DB_PATH + "/" + DB_NAME;

export const saveData = async function save(data) {
  data.date = new Date().toLocaleDateString();
  let currentData = await getData();
  currentData.push(data);
  return await writeData(JSON.stringify(currentData));
};

export const getData = async function () {
  try {
    return JSON.parse(await readFile(DB, "utf-8"));
  } catch (err) {
    return []; //if file empty or not created
  }
};
// export const getPostByInd = async function (ind) {
//   let all = await getData();
//   return all[ind] ? all[ind] : false;
// };

async function writeData(data) {
  await mkdir(DB_PATH, { recursive: true });
  await writeFile(DB, data);
}
