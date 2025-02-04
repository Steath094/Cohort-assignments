const fs = require('fs');

fs.readFile('C:/Users/samee/Documents/Web Dev/Learn/Cohort-assignments/week 2/week-2-async-js/easy/example.txt','utf-8',( err , data )=>{
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('Error: File not found!');
        } else {
            console.error('Error reading file:', err);
        }
        return;
    }
        console.log('File contents:', data);
})

const expensiveOperation = () => {
    let sum = 0;
    for (let i = 0; i < 1e8; i++) { 
      sum += i;
    }
    console.log('Expensive operation done');
  };
  expensiveOperation();
