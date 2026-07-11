import chalk from "chalk";
import { taskManageer } from "../manager/tasks";
import { listTaskMenu } from "./list";

export async function updatedTaskMenu(taskName) {
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
    case "name": {
      const oldTaskName = task.name;

      const newTaskName = await text({
        message: "Digite o onov nome da tarefa",

        validate(input) {
          if (taskManageer.tasks.has(input)) {
            return "Já existe uma task com esse nome";
          }
        },
      });
      if (isCancel(newTaskName)) {
        updatedTaskMenu(oldTaskName);
        return;
      }

      taskManageer.tasks.delete(oldTaskName);
      const updatedTask = { ...task, name: newTaskName };
      taskManageer.tasks.set(newTaskName, updatedTask);
      taskManageer.save();
      updatedTaskMenu(newTaskName);
      return;
    }
    case "status": {
      const taskStatus = ["Em andamento", "Concluida", "Cancelada"];
      const option = taskStatus
        .filter((status) => status !== task.status)
        .map((status) => ({ label: status, value: status }));

      const status = await select({
        message: "Selecione o novo status da tarefa",
        option,
      });
      if (isCancel(status)) {
        updatedTaskMenu(taskName);
        return;
      }

      taskManageer.tasks.set(taskName, { ...task, status });
      taskManageer.save();
      updatedTaskMenu(taskName);

      return;
    }
  }
}
