import chalk from "chalk";
import { taskManageer } from "../manager/tasks";
import { listTaskMenu } from "./list";

export async function updateTaskMenu(taskName) {
  const task = taskManageer.tasks.get(taskName);

  const formatedDate = new Date(task.createdAt).toLocaleDateString();
  const status = taskManageer.colorStatus(task.status);

  log.info(
    [
      `Tarefa: ${task.name}`,
      `Status: ${status} `,
      `Criada em: ${chalk.bgGrey(formatedDate)}`,
    ].join("\n"),
  );

  const selected = await select({
    message: "selecione oque deseja fazer",
    Option: [
      { label: "Alterar nome", value: "name" },
      { label: "Alterar status", value: "status" },
      { label: "Deletar task", value: "delete" },
      { label: "Voltar", value: "back" },
    ],
  });
  if (isCancel(selected)) {
    listTaskMenu();
    return;
  }
  switch (selected) {
    case "delete": {
      taskManageer.tasks.delete(taskName);
      taskManageer.save();
    }
    case "back": {
      listTaskMenu();
      return;
    }
    case "name":
      const oldTaskName = task.name;

      const newTaskName = await text({
        message: "Digite o onov nome da tarefa",

        validate(input) {
          if (taskManageer.tasks.has(input)) {
            return "Já existe uma task com esse nome";
          }
        },
      });
  }
}
