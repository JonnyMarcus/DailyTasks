import { log } from "@clack/prompts";
import { taskManageer } from "../manager/tasks.js";
import { main_menu } from "./main.js";

export async function listTaskMenu() {
  if (taskManageer.tasks.size < 1) {
    log.warn("Nenhuma tarefa a ser listada");
    setTimeout(() => main_menu(), 1000);
    return;
  }
}
