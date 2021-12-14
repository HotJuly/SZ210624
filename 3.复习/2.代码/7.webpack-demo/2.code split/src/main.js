// import jquery from 'jquery';
// import {a1} from './lodash';

// console.log('main',jquery)

document.querySelector('#btn').onclick=function(){
    import(/* webpackChunkName:'lodash'  */'./lodash.js').then(({a1})=>{
        console.log(a1(123,234))
    })
}