const { Command } = require('commander');
const program = new Command();
const fs = require('fs');

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('input')
  .description('Count Word of a file')
  .argument('<string>', 'string to count words')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;

    fs.readFile(str,'utf-8',(err,data)=>{
        const length = data.split(" ").length;
        console.log(`You Have ${length} words in this file`);
    })

  });

program.parse();