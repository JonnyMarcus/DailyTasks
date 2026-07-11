import { log, select } from "@clack/prompts";
import { taskManageer } from "../manager/tasks.js";
import { main_menu } from "./main.js";
import { updateTaskMenu } from "./update.js";

export async function listTaskMenu() {
  if (taskManageer.tasks.size < 1) {
    log.warn("Nenhuma tarefa a ser listada");
    setTimeout(() => mainMenu(), 1000);
    return;
  }
  const selected = await select({
    message: "Selecione uma tarefa",
    options: [
      ...taskManageer.toArray().map(({ name, status }) => ({
        label: `${taskManageer.colorStatus} ${chalk.white.underline(name)}`,
        value: name,
      })),
      { label: "Menu principal", value: "main" },
    ],
  });
  if (isCancel(selected) || selected === "main") {
    mainMenu();
    return;
  }
  updateTaskMenu(selected);
}
