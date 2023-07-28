// This program is a command line tool that is run using node.js.

const inquirer = require('inquirer');
const fs = require('fs');

function readme (answers) {
  return `
# ${answers.projectTitle}

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Description

${answers.description}

## Installation

${answers.installation}

## Usage

${answers.usage}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

##  Questions

* https://github.com/${answers.github}
* Contact me by email at mailto:${answers.email} if you have questions.

  `;
}


inquirer
  .prompt([
    {
      name:"projectTitle", 
      message:"What is the title of your project?",
    },
    {
      name:"description", 
      message:"Enter the description of the project:",
    },
    {
      name:"installation", 
      message:"Enter the installation instructions for the project:",
    },
    {
      name:"usage", 
      message:"Enter the usage instructions for the project:",
    },
    {
      name:"contributing", 
      message:"Enter the contributing instructions for the project:",
    },
    {
      name:"tests", 
      message:"Enter the tests instructions for the project:",
    },
    {
      name:"license", 
      message:"Choose a license for the project:",
      type: "list",
      choices: ["GPL", "Apache", "BSD", "MIT"]
    },
    {
      name:"github", 
      message:"What is your GitHub user name?",
    },

    {
      name:"email", 
      message:"What is your email address?",
    },

  ])
  .then(answers => {
    let markdown = readme(answers);

    fs.writeFile(
      "Generated/README.md", 
      markdown,
      {},
      error => {
        if (error) {
          console.log("An error occurred writing the README file");
        } else {
          console.log("We made your README!");
        }
      });

  })
  .catch(error => {
    console.log(error);
    console.log('there was a problem asking questions ask developer to debug');
  });

