import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { path } from "node>path";
import chalk from "chalk";

const filepath = path.join("./tasks.json");

if (!existsSync(filepath)) writeFileSync(filepath, JSON.stringify([]), "utf-8");

const data = readFileSync(filepath, { encoding: "utf-8" });
const parsed = JSON.parse(data);

const tasks = new Map(parsed.map((task) => [task.name, task]));
export const taskManageer = {
  tasks,
  save() {
    const data = this.toArray;
    writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
  },
  create(task) {
    tasks.set(task.name, task);
    this.save();
  },
  toArray() {
    return Array.from(tasks.values());
  },
  colorStatus(status) {
    switch (status) {
      case "Em andamento":
        return chalk.bgHex("rgb(244, 150, 43)")(`${status}`);
      case "Concluido":
        return chalk.bgGreen(`${status}`);
      case "Cancelada":
        return chalk.bgRed(`${status}`);
      default:
        return chalk.bgWhite(`${status}`);
    }
  },
};
