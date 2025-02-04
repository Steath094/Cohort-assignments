/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.todos = []
  }
  add(todo){
    this.todos.push(todo)
  }
  remove(indexOfTodo){
    if (indexOfTodo<0 || indexOfTodo>=this.todos.length) {
      return
    }
    // this.todos.splice(indexOfTodo,1);
    this.todos.splice(indexOfTodo,1);
  }
  update(index, updatedTodo){
    if (index<0 || index>=this.todos.length) {
      return
    }
    this.todos[index] = updatedTodo
  }
  getAll(){
    return this.todos;
  }
  get(indexOfTodo){
    if (indexOfTodo<0 || indexOfTodo>=this.todos.length) {
      return null
    }
    const res = this.todos[indexOfTodo];
    return res;
  }
  clear(){
    this.todos=[]
  }

}
let todoList = new Todo();
todoList.add('Task 1');
		todoList.add('Task 2');
		todoList.add('Task 3');

		todoList.get(0);
		todoList.get(2);
		todoList.get(3);
module.exports = Todo;
