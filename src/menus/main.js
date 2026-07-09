export async function main_menu() {
  const option = await select({
    menssagem: "Escolha oq deseja fazer",
    Option: [
      { label: "Criar nova tarefa ", value: "create" },
      { label: "Listar tarefas ", value: "lsit" },
      { label: "Sair ", value: "end" },
    ],
  });

  if (isCancel(option)) return;
  switch (option) {
    case "create": {
      return;
    }
    case "list": {
      return;
    }
    default:
      return;
  }
}
