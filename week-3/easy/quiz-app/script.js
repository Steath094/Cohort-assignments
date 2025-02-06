let score = 0;
const options = ['a','b','c','d'];
function createQuestionDiv(index){
    const data = quizData[index];
    const questionBox = document.querySelector('.questionbox')
    questionBox.innerHTML = `
        <div class="question">
                ${data.question}
            </div>
            <div class="options">
                <label class="container">${data.a}
                    <input type="radio" checked="checked" name="radio">
                    <span class="checkmark"></span>
                  </label>
                  <label class="container">${data.b}
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                  </label>
                  <label class="container">${data.c}
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                  </label>
                  <label class="container">${data.d}
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                  </label>
            </div>
            <button onClick="submitandLoad(${index})" class="submit">Submit</button>
    `
}
function reload() {
    location.reload();
}
function renderResult() {
    const questionBox = document.querySelector('.questionbox')
    questionBox.innerHTML = `<div class="question">
                You answered <span class="number">${score}</span>/ <span class="number">4</span> questions correctly
            </div>
            <button onclick="reload()" class="submit">Reload</button>`
}
function submitandLoad(index) {
    let opt = 0;
    const containers = document.querySelectorAll('.container')
    for (let i = 0; i < 4; i++) {
        if(containers[i].children[0].checked){
            opt=i;
            break;
        }
    }
    if(options[opt]==quizData[index].correct){
        score++;
    }
    if(index<3){
        createQuestionDiv(index+1);
    }else{
        renderResult();
    }
    
}
createQuestionDiv(0);