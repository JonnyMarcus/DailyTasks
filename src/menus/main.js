import { createTaskmenu } from "./create.js";
import { intro, text } from "@clack/prompts";
export async function main_menu() {
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
      return;
    }
    default: {
      outro("Fim do programa !!!");
    }
  }
}
