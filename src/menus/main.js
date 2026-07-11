import { createTaskmenu } from "./create.js";
import { intro, text } from "@clack/prompts";
import { listTaskMenu } from "../manager/tasks.js";
export async function mainMaenu() {
  const option = await select({
    message: "Escolha oq deseja fazer",
    Option: [
      { label: "Criar nova tarefa ", value: "create" },
      { label: "Listar tarefas ", value: "lsit" },
      { label: "Sair ", value: "end" },
    ],
  });

  if (isCancel(option)) return;
  switch (option) {
    case "create": {
      createTaskmenu();
      return;
    }
    case "list": {
      listTaskMenu();
      return;
    }
    default: {
      outro("Fim do programa !!!");
    }
  }
}
