// This program is a command line tool that is run using node.js.

const inquirer = require('inquirer');
const fs = require('fs');

function readme (answers) {
  return `

This is the README FILE!!

Text in the template.

# ${answers.projectTitle}

End of the file.

  `;
}


inquirer
  .prompt([
    {
      name:"projectTitle", 
      message:"What is the title of your project?",
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

