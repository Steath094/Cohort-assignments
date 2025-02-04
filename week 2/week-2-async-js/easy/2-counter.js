let timer = 0;
const updateTimer = () =>{
    timer++;
    console.log(timer);
    setTimeout(updateTimer,1000)
}
updateTimer();