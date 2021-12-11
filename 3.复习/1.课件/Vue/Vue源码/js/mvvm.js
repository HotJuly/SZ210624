function MVVM(options) {
  /*
    this指向是谁?
      vm实例对象

    传入的参数是什么?
    {
      el: "#app",
      data: {
        msg: "hello mvvm",
        person:{
          name:"xiaoming",
          msg:"123"
        },
      }
    }
  */

   //把配置对象保存给vm一份
    this.$options = options;
    //把配置对象的data保存到vm的_data 地址一样

    // 在Vue2中数据存储于this.$data中
    var data = this._data = this.$options.data;

    // var data = (this._data = this.$options.data);

    var me = this; //保存vm给me

    // 1.数据代理
    /*
      代理:代理身上没有我们需要的数据,但是我们找代理获取数据,他会去找源对象获取数据,在转交给我们
      目的:
        数据代理的目的,只是为了让开发更加方便获取$data中的属性值
          this.msg=>this.$data.msg
      实现做法:
          1.获取data中所有的属性组成的数组
          2.在this身上添加对应的访问描述符(get/set),从而实现数据代理
      代理次数:
          只代理data中的直系属性

      注意:他其实不是响应式原理中不可或缺的一部分
    
    */
    // 实现 vm.xxx -> vm._data.xxx
    // Object.keys只能获取到对象直系属性组成的数组
    
    Object.keys(data).forEach(function(key) {
      // 遍历data当中的所有属性，每个属性都会调用下面的_proxy方法
        me._proxy(key);
    });

    
    // ["msg","person"].forEach(function(key) {
    //   // 遍历data当中的所有属性，每个属性都会调用下面的_proxy方法
    //     vm._proxy("msg");
    // });


    /*2.数据劫持（原始data当中的所有属性数据进行监视）
     劫持:违背了被劫持人的意愿,本来$data上的属性具有value值,但是被强行抛弃,改为get/set方法
     目的:
        为了实现响应式原理
        当开发者修改某个$data中的属性值,Vue都能监视到,从而同时视图重新渲染
     实现做法:
         1.将准备劫持的数据传入observe函数,如果是个对象,就开始数据劫持
         2.通过walk方法遍历$data中所有的直系属性,并对每个直系属性进行数据劫持
         3.进入defineReactive函数中
              -首先会给每个属性创建一个对应的dep对象
              -然后检查当前属性值是否是个对象,如果是对象就继续深度劫持(回到流程1)
              -将$data对象中所有的属性进行重写,变成get/set方法,并使用闭包保存原先属性的value
              -set方法说明
                  如果用户修改属性值,如果属性值与旧值相同,就不会导致视图更新
                  如果属性值是个对象,继续深度劫持(回到流程1)
                  使用dep.notify通知试图更新
     劫持次数:
          data对象中具有多少个属性,就劫持多少次

          Vue2注意点:
            1.数组其实也是特殊的对象,从技术上来说,也可以被深度劫持
              但是Vue2没有这么做
              解决方法:将数组的7个操作方法进行重写(例如:push,pop,shift,unshift,splice)
    */     

    /*
      需求:当某个data属性值被修改时,自动重新渲染页面,展示最新数据
      拆解:
        1.当某个data属性值被修改时
          可以通过Object.defineProperty去定义属性的set和get方法,如果用户修改该属性,就会触发set方法
        2.重新渲染页面,展示最新数据
          肯定和原生DOM有关

    */

    observe(data, this);
    
    // observe(data, vm);

    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
      // key=>"msg"
      // this=>vm
      // 保存vm以方便下面的函数中也可以找到vm
        var me = this;

        //正儿八经的数据代理
        //在vm身上添加一个和data当中同名的属性
        Object.defineProperty(me, key, {
            configurable: false, //不能重复定义
            enumerable: true, //可以遍历
            get: function proxyGetter() {
              //当访问vm身上的属性值的时候，会去返回data的同名属性值
                return me._data[key];
            },
            set: function proxySetter(newVal) {
              //当设置vm身上的属性值的时候，会去设置data的同名属性值
                me._data[key] = newVal;
            }
        });

        // 此处再向vm对象身上添加msg属性
        // console.log(this.msg)
        // this.msg=123
      //   Object.defineProperty(vm, "msg", {
      //     configurable: false, //不能重复定义
      //     enumerable: true, //可以遍历
      //     get: function proxyGetter() {
      //       //当访问vm身上的属性值的时候，会去返回data的同名属性值
      //         return vm._data["msg"];
      //     },
      //     set: function proxySetter(newVal) {
      //       //当设置vm身上的属性值的时候，会去设置data的同名属性值
      //         vm._data["msg"] = 123;
      //     }
      // });
    }
};