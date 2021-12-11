function Observer(data) {
  // data就是我们传过来的this.$data
//   this->ob实例
  // 在Observer实例化对象身上先保存data 地址是一样的
    this.data = data;
    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        var me = this; //保存Observer实例化对象，因为下面要用
        Object.keys(data).forEach(function(key) {
            //遍历data当中所有的属性，每个属性都会调用convert方法
            //这个方法内部又去调用了defineReactive方法
            me.convert(key, data[key]); //msg  'zhaoliying'
        });
        
        // ["msg","person"].forEach(function(key) {
        //     //遍历data当中所有的属性，每个属性都会调用convert方法
        //     //这个方法内部又去调用了defineReactive方法
        //     ob.convert("msg", "hello mvvm"); 
        // });
    },
    convert: function(key, val) { 
        // "msg", "hello mvvm"
        this.defineReactive(this.data, key, val); 
        // this.defineReactive(this.$data, "msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // this.$data, "msg", "hello mvvm"

        // 每次进入defineReactive都会生成一个dep对象
        // 总结:只要data中每有一个属性就会生成一个对应的dep对象

        var dep = new Dep();  //根据遍历的每个属性都会创建一个特定的dep对象与相应的data属性进行关联
        var childObj = observe(val); //递归调用，目的是为了看属性的值是不是又是对象，如果是递归给每个属性也创建dep对象
        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            //对data当中所有的属性都添加 get和set方法让其成为响应式的属性
            //为了监视这些数据的变化，如果发生变化，那么将会通知去修改页面上的效果
            get: function() {
              
                //让属性和页面上的表达式 进行绑定
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });

        // 代理是在新增属性,劫持是在重写属性
        // get/set方法和value属性是无法共存的,数据劫持会导致value值丢失
        // 但是Vue通过闭包的形式将每个属性的值都保留了一份在val中

        // Object.defineProperty(this.$data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     //对data当中所有的属性都添加 get和set方法让其成为响应式的属性
        //     //为了监视这些数据的变化，如果发生变化，那么将会通知去修改页面上的效果
        //     get: function() {
              
        //         //让属性和页面上的表达式 进行绑定
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
            //      如果新值等于旧值,就不会触发视图更新
        //         if (newVal === val) {
        //             return;
        //         }
        //         val = newVal;
        //         // 新的值是object的话，进行监听
        //         childObj = observe(newVal);
        //         // 通知订阅者
        //         dep.notify();
        //     }
        // });
    }
};


//首先判断传过来的data也就是这个value是不是一个对象，如果是才去监视
// {msg:'zhaoliying'}
function observe(value, vm) {
    // value=>data, vm
    if (!value || typeof value !== 'object') {
        return;
    }
    // 如果传过来的data是对象，那么就开始监视
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);

        // dep对象收集到与他相关的所有watcher对象
        // 响应式属性收集到与他相关的所有插值语法
        // dep.subs.push(watcher);
    },

    depend: function() {
        Dep.target.addDep(this);
        // watcher.addDep(dep);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
            // watcher.update();
        });
    }
};

Dep.target = null;