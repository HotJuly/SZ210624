const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}

/*
  nextTick注意点:
    1.在主线程代码中,多次使用nextTick函数,只会开启一个.then微任务
      但是nextTick中内置callbacks数组,会收集多次调用传入的回调函数

  Vue响应式流程
    1.当响应式属性发生修改,会触发数据劫持
    2.数据劫持中,会触发dep.notify方法,通知视图更新
    3.Vue会触发一个watcher.update方法,更新视图
    4.update方法中会触发queueWatcher方法
    5.queueWatcher方法中会将更新视图的方法交给nextTick执行

    总结:也就是说Vue更新视图的操作会被放入微任务队列中

    注意:当你想操作某个更新之后显示的真实DOM,一定要将nextTick函数放在更新状态代码之后执行
*/