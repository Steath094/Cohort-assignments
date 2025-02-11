const { Command } = require('commander');
const program = new Command();
const fs = require('fs');
const todo = require('./file.json')
// console.log(todo);

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('add <id> <name> <isCompleted>')
  .description('Add todo')
  .action((id,name,isCompleted) => {
    if(id=='' || name=='' || isCompleted==''){
        console.log("ID,Name and discription all fields are required to create a todo");
        return
    }
    const task = {
        id: parseInt(id),
        task: name,
        completed: isCompleted=='true'
    }
    todo.push(task);
    fs.writeFileSync('./file.json', JSON.stringify(todo, null, 2));
    // console.log(todo);
    
});
program.command('delete <id>')
.description('Delete todo')
.action((id) => {
  if(id==''){
      console.log("ID fields is required to delete a todo");
      return
  }
  const temp = todo.filter(item=> item.id!=id); 
  fs.writeFileSync('./file.json', JSON.stringify(temp, null, 2));
  // console.log(todo);
});
program.command('update <id> <isCompleted>')
  .description('Update Completion')
  .action((id,isCompleted) => {
    if(id==''){
        console.log("ID fields is required to update a todo");
        return
    }
    if(isCompleted==''){
        console.log("isCompleted fields is required to update a todo");
        return
    }
    todo.forEach(item=>{
        if(item.id==id){
            item.isCompleted = isCompleted=='true';
        }
    }); 
    fs.writeFileSync('./file.json', JSON.stringify(todo, null, 2));
});

program.parse();