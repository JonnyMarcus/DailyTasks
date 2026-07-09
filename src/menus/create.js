import { isCancel } from "@clack/prompts";
import { taskManager } from "../manager/tasks.js";
import { log, text } from "@clack/prompt";
import { main_menu } from "./main.js";

export async function createTaskmenu() {
  let name;

  do {
    name = await text({
      message: "digite o nome da tarefa",
    });
    if (taskManager.tasks.has(name)) {
      log.error("Ja existe uam tearefa com esse nome !");
    }
  } while (taskManager.task.has(name));

  if (isCancel(name)) {
    main_menu();
    return;
  }

  const task = {
    name,
    status: "Em andamento",
    createdAT: new Date().toISOString(),
  };

  taskManager.create(task);

  log.success("Tarefa criada com sucesso");

  setTimeout(() => main_menu, 1000);
}
