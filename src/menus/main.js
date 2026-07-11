import { createTaskmenu } from "./create.js";
import { intro, text, select, isCancel, outro } from "@clack/prompts";
import chalk from "chalk";
import { listTaskMenu } from "../menus/list.js";

export async function mainMenu() {
  const option = await select({
    message: "Escolha oq deseja fazer",
    options: [
      { label: "Criar nova tarefa ", value: "create" },
      { label: "Listar tarefas ", value: "list" },
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
