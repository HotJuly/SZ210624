function Compile(el, vm) {
    // el->"#app",vm
    // this->解析器对象com
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        // 将app元素中所有的直系子节点已转移到文档碎片中
        this.$fragment = this.node2Fragment(this.$el);

        // 此处是beforeMount的执行时机!!!!!!

        // 开始编译模版,实现插值语法转换
        this.init();

        // 这一步就是所谓的挂载,将编译完的内容插入到页面的html中
        this.$el.appendChild(this.$fragment);

        // 此处是mounted的执行时机!!!!!!
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->app元素
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        // 相当于app元素被抄家了
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // el->fragment
        // el->p元素
        // 获取到文档碎片中所有子节点组成的伪数组
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
        // [text节点,p节点,text节点].forEach(function(node) {
            // text->"{{msg}}"
        //     var text = node.textContent;
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
            // 此处是准备解析指令
        //         me.compile(node);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         com.compileText(text节点, "msg");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(node);
        //     }
        // });
    },

    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        // text节点, "msg"
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, vm, "msg");
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // text节点, vm, "msg"
        // 总结:每存在一个插值语法就会执行一次bind函数
        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // text节点, vm, "msg", 'text'
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // updaterFn && updaterFn(text节点, "hello mvvm");

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
        
        // new Watcher(vm, "msg", function(value, oldValue) {
        //     updaterFn && updaterFn(text节点, value, oldValue);
        // });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            // Vue1的事件回调函数是在绑定的时候才改变this指向
            // Vue2中,在初始化组件的时候,methods中所有的方法都会被强行改变this指向
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // vm, "msg"
        // vm, "person.name"
        var val = vm._data;

        // exp->["person","name"]
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
            // val = vm._data["person"];
            // val = person["name"];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // 此处就是将插值语法更新为data中的数据
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};