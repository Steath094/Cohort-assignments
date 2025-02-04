const fs = require('fs');
fs.readFile('C:/Users/samee/Documents/Web Dev/Learn/Cohort-assignments/week 2/week-2-async-js/medium/example.txt','utf-8',(err,data)=>{
    if (err) {
        console.log("Error occured",err);
        return;
    }
    const str = data.split(" ").filter(word=>word!='').join(" ");
    fs.writeFile("C:/Users/samee/Documents/Web Dev/Learn/Cohort-assignments/week 2/week-2-async-js/medium/example.txt",str,(err)=>{
    if (err) {
        console.log("Error occured");
    }
})
})
