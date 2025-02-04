setInterval(()=>{
    const date = new Date();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    console.log(`${hrs}:${min}:${sec}`);
    const meridian = hrs>12?'pm':'am';
    console.log(`${hrs}:${min}:${sec} ${meridian}`);

},1000)


const updateTime=()=>{
    const date = new Date();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    console.log(`${hrs}:${min}:${sec}`);
    const meridian = hrs>12?'pm':'am';
    console.log(`${hrs}:${min}:${sec} ${meridian}`);

    setTimeout(updateTime,1000);
}
updateTime();