// This program is a command line tool that is run using node.js.

const inquirer = require('inquirer');
const fs = require('fs');

function readme (answers) {

  let licenseBadge = "";
// choices: ["GPL", "Apache", "BSD", "MIT"]
  if (answers.license === "GPL v3") {
    licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
  } else if (answers.license === "Apache") {
    licenseBadge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  } else if (answers.license === "BSD") {
    licenseBadge = "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
  } else if (answers.license === "MIT") {
    licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  }

  return `
# ${answers.projectTitle}

## Table of Contents

* [Description](#description)
* [License](#license)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Description

${answers.description}

## License

The code in this project is licensed according to the ${answers.license} license.

${licenseBadge}



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
      choices: ["GPL v3", "Apache", "BSD", "MIT"]
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
          console.log("An error occurred writing the README file.");
        } else {
          console.log("We made your README. It can be found in the 'Generated' folder.");
        }
      });

  })
  .catch(error => {
    console.log(error);
    console.log('There was a problem asking questions. Ask the developer to debug.');
  });

