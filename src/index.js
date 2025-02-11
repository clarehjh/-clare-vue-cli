#!/usr/bin/env node

const { version: packageVersion } = require("../package.json");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { program } = require("commander");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const symbols = require("log-symbols");
const downloadModule = require(path.resolve(__dirname, "./download"));
const repositoriesModule = require(path.resolve(__dirname, "./repositories"));

program.version(packageVersion, "-v, --version");

program
  .command("create <name>")
  .description("创建一个项目模板")
  .action(async (name) => {
    await checkAndCreateProject(name);
  });

clear();
console.log(
  chalk.blueBright(figlet.textSync("ruisir", { horizontalLayout: "full" }))
);
program.parse(process.argv);

async function checkAndCreateProject(name) {
  if (fs.existsSync(path.join(process.cwd(), name))) {
    console.error(
      symbols.error,
      chalk`{rgb(255,255,255) Target directory {rgb(130,223,226) ${path.join(
        process.cwd(),
        name
      )}} already exists.}`
    );
    return;
  }

  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "choose a template type you want to create:",
      choices: ["Vue3-Ts-ElementPlus", "Vue3-H5-Vant4", "uniapp-vue3-vite"],
    },
  ]);

  console.log(type);

  const typeRepositories = repositoriesModule[type];
  const typeKeys = Object.keys(typeRepositories);

  if (typeRepositories && typeKeys.length > 0) {
    const { templateName } = await inquirer.prompt([
      {
        name: "templateName",
        message: `choose the template you need:`,
        type: "list",
        choices: typeKeys,
      },
    ]);

    const downloadPath = `direct:${typeRepositories[templateName]}`;
    await downloadTemplate(downloadPath, name);
  } else {
    console.log(
      symbols.info,
      chalk`{rgb(255,255,255) There are no templates for ${type}}`
    );
  }
}

async function downloadTemplate(downloadPath, projectName) {
  try {
    await downloadModule(downloadPath, projectName);
    console.log(
      symbols.success,
      chalk`{rgb(87,190,56) download successfully!}`
    );
  } catch (err) {
    console.error(symbols.error, chalk`{rgb(255,255,255) ${err}}`);
    console.error(
      symbols.error,
      chalk`{rgb(255,255,255) download template fail, please check your network connection and try again.}`
    );
    process.exit();
  }
}
