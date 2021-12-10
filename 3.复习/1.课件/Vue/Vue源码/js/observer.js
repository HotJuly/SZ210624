function Observer(data) {
    // data->this._data
    // data->{
        //     name:"xiaoming",
        //     msg:"123"
        //   }
    // this->ob对象
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        // data->this._data
        // this->ob对象
        var me = this; //保存Observer实例化对象，因为下面要用
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", "hello mvvm");
        // });
    },
    convert: function(key, val) {
        // "msg", "hello mvvm"
        this.defineReactive(this.data, key, val);
        // this.defineReactive(this._data, "msg", "hello mvvm");
    },

    defineReactive: function(data, key, val) {
        // this._data, "msg", "hello mvvm"
        // {
        //     name:"xiaoming",
        //     msg:"123"
        //   }

        // 每次调用defineReactive就会生成一个dep对象
        // data中每有一个直系属性就会执行一次defineReactive
        // 总结:data中每有一个响应式属性,就会创建一个dep对象
        var dep = new Dep();

        // 此处在执行隐式递归,
        // 如果value是一个对象,那么会继续对该对象进行深度数据劫持
        var childObj = observe(val);
        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

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

                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });

        // 此处不是在新增属性,而是在重写属性
        // Object.defineProperty(this._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         //让属性和页面上的表达式 进行绑定
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
            // 此处使用了闭包缓存msg的原先数据
        //         if (newVal === val) {
        //             return;
        //         }
        //         val = newVal;

        //          此处会对当前赋值的结果进行深度劫持
        //         childObj = observe(newVal);
        //         // 通知订阅者
        //         dep.notify();
        //     }
        // });

    }
};


function observe(value, vm) {
    // value=this._data, vm
    // value="hello mvvm"
    // value={
        //     name:"xiaoming",
        //     msg:"123"
        //   }
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        // dep.addSub(watcher);
        // 此处dep正在收集与当前响应式属性相关的插值语法(watcher)
        this.subs.push(sub);
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
            // sub->watcher
            sub.update();
            // watcher.update();
        });
    }
};

Dep.target = null;