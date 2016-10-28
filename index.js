/**
 * @file index.js 布尔运算
 * @author clarkt(clarktanglei@163.com)
 */

(function () {
    var bool = {
        intersect: function () {

        },

        merge: function () {

        },

        mergeObject: function () {
            if (arguments[0] == null) {
                return arguments[0];
            }

            switch (arguments.length) {
                case 1:
                    return arguments[0];
                case 2:
                    return Object.keys(arguments[1])
                        .reduce(function (res, key) {
                            res[key] = obj[key];
                            return res;
                        }, arguments[0]);
                default:
                    return Array.prototype.slice.call(arguments)
                        .reduce(this.mergeObject);
            }
        },



        mergeArray: function () {

        },

        complement: function () {

        },

        isContain: function (obj1, obj2) {
            return this.isEqual(obj1, obj2, 'part');
        },

        /**
         * 判断两者是否相等
         * 当type === 'part' 时，判断obj1是否部分相等于obj2，即obj1是否包含obj2
         *
         * @param {*} obj1 被检测项
         * @param {*} obj2 检测项
         * @param {string=} type 判断相等的类型 完全相等或部分相等
         * @return {boolean} 是否相等
         */
        isEqual: function (obj1, obj2, type) {
            // 经此判断之后，后续的基本数据类型都可直接返回false
            if (obj1 === obj2) {
                return true;
            }

            var obj1Instance = this.instance(obj1);
            // 两者原型不同时，不相等
            if (obj1Instance !== this.instance(obj2)) {
                return false;
            }

            switch (obj1Instance) {
                case 'Array':
                    return this.isEqualArray(obj1, obj2, type);
                case 'Object':
                    return this.isEqualObject(obj1, obj2, type);
                default:
                    // boolean number string null undefined
                    // 就不考虑NaN和-0 +0的情况了，该组件的数据不存在这种case
                    return false;
            }
        },

        /**
         * 判断两个数组是否相等
         * 当type === 'part' 时，判断obj1是否部分相等于obj2，即obj1是否包含obj2
         *
         * @param {Array} obj1 被检测项
         * @param {Array} obj2 检测项
         * @param {string=} type 判断相等的类型 完全相等或部分相等
         * @return {boolean} 是否相等
         */
        isEqualArray: function (obj1, obj2, type) {
            // 数组需要判断长度是否相等，数组对应位置的元素是否相等
            if (obj1.length !== obj2.length) {
                return false;
            }

            return !obj1.some(function (key, i) {
                return !this.isEqual(obj1[i], obj2[i], type);
            }.bind(this));
        },

        /**
         * 判断两个Object是否相等
         * 当type === 'part' 时，判断obj1是否部分相等于obj2，即obj1是否包含obj2
         *
         * @param {Object} obj1 被检测项
         * @param {Object} obj2 检测项
         * @param {string=} type 判断相等的类型 完全相等或部分相等
         * @return {boolean} 是否相等
         */
        isEqualObject: function (obj1, obj2, type) {
            // 对象就判断对应属性是否相等即可
            var obj2Keys = Object.keys(obj2);
            // 当不是部分相等模式时，需要对各属性值做完全匹配
            if (type !== 'part'
                && (obj2Keys.length !== Object.keys(obj1).length)
            ) {
                return false;
            }

            return !obj2Keys.some(function (key) {
                return !this.isEqual(obj1[key], obj2[key], type);
            }.bind(this));
        },

        /**
         * 获取对象原型名称
         *
         * @param {*} obj 要获取原型的对象
         * @return {string} 原型名称
         */
        instance: function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1);
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = bool;
    }
    else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function () {
            return bool;
        });
    }
    else {
        this.bool = bool;
    }
})
.call(this);
