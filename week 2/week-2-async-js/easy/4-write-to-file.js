const fs = require('fs');

fs.writeFileSync('C:/Users/samee/Documents/Web Dev/Learn/Cohort-assignments/week 2/week-2-async-js/easy/example.txt','Everthing is cleaned',( err , data )=>{
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