const fs  = require('fs');

// setTimeout(()=>{
//     console.log('setTimeout1')
// },1000)


// fs.readFile('./01.原型与原型链.html',()=>{
//     console.log('readFile')

//     setTimeout(()=>{
//         console.log('setTimeout2')
//     },1)
    
//     setImmediate(()=>{
//         console.log('setiImmediate')
//     })
    
//     for(var i=0;i<200000;i++){

//     }
// })


/*
    node中具有宏任务和微任务
        宏任务相当于是普通人
        then相当于是VIP
        nextTick就是SVIP

    node中具有六个宏任务队列,两个微任务队列
        then和nextTick具有两个不同的微任务队列
        如果在同一起跑线上,nextTick队列优先执行

*/
// Promise.resolve().then(()=>{
//     console.log('then1');
    
//     process.nextTick(()=>{
//         console.log('nextTick');
//     })

//     Promise.resolve().then(()=>{
//         console.log('then2');
//     })
// })


process.nextTick(()=>{
    console.log('nextTick1');

    Promise.resolve().then(()=>{
        console.log('then1');
    })

    process.nextTick(()=>{
        console.log('nextTick2');
    })
})
