import { intro, text } from "@clack/prompts";
import chalk from "chalk";
import { mainMenu } from "./menus/main";

intro(`📋${chalk.bgGreen("Tarefas")}`);

mainMenu();
