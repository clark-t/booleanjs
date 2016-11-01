/**
 * @file index.js 布尔运算
 * @author clarkt(clarktanglei@163.com)
 */

export default {

    /**
     * 获取多个Object|Array的交集
     *
     * @param  {...Object|Array} objs arguments
     * @return {Object|Array} 交集
     */
    same: function (...objs) {
        return Array.isArray(objs[0])
            ? this.sameArray(...objs)
            : this.sameObject(...objs);
    },

    /**
     * 获取多个Object的交集
     *
     * @param {Object} obj 第一个参数必须是个对象
     * @param {...Object|Array=} objs arguments
     *                                如果为Object，则直接取该对象与obj的交集
     *                                如果为Array，则为要保留的keys
     * @return {Object} 对象的交集
     */
    sameObject: function (obj, ...objs) {
        switch (objs.length) {
            case 0:
            case 1:
                if (objs[0] == null) {
                    return obj;
                }

                let keys = Array.isArray(objs[0])
                    ? objs[0].filter(key => obj[key] != null)
                    : Object.keys(objs[0]).filter(key => obj[key] === objs[0][key]);

                return keys.reduce((res, key) => setKey(res, key, obj[key]), {});
            default:
                return objs.reduce((res, obj) => this.sameObject(res, obj), obj);
        }
    },

    /**
     * 取多个Array的并集
     *
     * @param {Array} arr 第一个参数必须是个数组
     * @param {...Array=} arrs arguments
     * @return {Array} 数组的交集
     */
    sameArray: function (arr, ...arrs) {
        switch (arrs.length) {
            case 0:
            case 1:
                if (arrs[0] == null) {
                    return arr;
                }

                return arr.filter(item1 =>
                    arrs[0].some(item2 => this.isEqual(item1, item2))
                );
            default:
                return arrs.reduce((res, arr) => this.sameArray(res, arr), arr);
        }
    },

    /**
     * 多个对象或多个数组的交集
     *
     * @param  {...Object|Array} objs 多个对象或多个数组
     * @return {Object|Array} 交集
     */
    merge: function (...objs) {
        return Array.isArray(objs[0])
            ? this.mergeArray(...objs)
            : this.mergeObject(...objs);
    },

    /**
     * 与Object.assign相同，只不过不想用babel-polyfill所以自己手写了个
     *
     * @param  {...Object} objs 多个对象
     * @return {Object} 合并后的对象，同时内存地址指向传入的第一个参数
     */
    mergeObject: function (...objs) {
        switch (objs.length) {
            case 0:
            case 1:
            case 2:
                if (objs[1] == null) {
                    return objs[0];
                }

                return Object.keys(objs[1])
                    .reduce((res, key) => setKey(res, key, objs[1][key]), objs[0]);
            default:
                return objs.reduce((res, obj) => this.mergeObject(res, obj));
        }
    },

    /**
     * 多个数组合并，会过滤掉相同的子元素，同时将不相同的元素拼接到数组后面
     *
     * @param {...Array} arrs 多个数组
     * @return {Array} 合并后的数组，同时内存地址指向传入的第一个参数
     */
    mergeArray: function (...arrs) {
        switch (arrs.length) {
            case 0:
            case 1:
            case 2:
                if (arrs[1] == null) {
                    return arrs[0];
                }

                return append(arrs[0],
                    toArray(arrs[1]).filter(obj2 => !this.isContain(arrs[0], obj2))
                );
            default:
                return arrs.reduce((res, arr) => this.mergeArray(res, arr));
        }
    },

    /**
     * 求obj1与obj2的补集
     *
     * @param {Object|Array} obj1 obj1
     * @param {Object|Array} obj2 obj2
     * @return {Object|Array} obj1与obj2的补集
     */
    exclude: function (obj1, obj2) {
        return Array.isArray(obj1)
            ? this.excludeArray(obj1, obj2)
            : this.excludeObject(obj1, obj2);
    },

    /**
     * 对象obj1和obj2的补集
     *
     * @param {Object} obj1 obj1
     * @param {Object|Array} obj2 obj2可以传入对象，或者是obj1要被排除掉的key数组
     * @return {Object} 补集
     */
    excludeObject: function (obj1, obj2) {
        let keys = Array.isArray(obj2)
            ? obj2.filter(key => obj1[key] != null)
            : Object.keys(obj2).filter(key => obj1[key] === obj2[key]);

        return Object.keys(obj1)
            .filter(key => keys.indexOf(key) === -1)
            .reduce((res, key) => setKey(res, key, obj1[key]), {});
    },

    /**
     * 数组arr1与arr2的补集，忽略元素顺序
     *
     * @param {Array} arr1 arr1
     * @param {Array} arr2 arr2
     * @return {Array} arr1与arr2的补集
     */
    excludeArray: function (arr1, arr2) {
        return arr1.filter(obj1 => !this.isContain(arr2, obj1));
    },

    /**
     * 判断两个对象或者两个数组是否属于包含关系
     * 当判断对象为两个数组时，忽略数组顺序
     *
     * @param {Object|Array} obj1 obj1
     * @param {*} obj2 obj2
     * @return {boolean} obj1是否包含obj2
     */
    isContain: function (obj1, obj2) {
        switch (this.instance(obj1)) {
            case 'Object':
                return this.isContainObject(obj1, obj2);
            case 'Array':
                return this.isContainArray(obj1, obj2);
            default:
                return this.isEqual(obj1, obj2);
        }
    },

    /**
     * 数组obj1是否包含obj2
     *
     * @param {Array} obj1 数组
     * @param {Object} obj2 当obj2不为数组时，则判断obj2是否为obj1中的元素
     * @return {boolean} obj1是否包含obj2
     */
    isContainArray: function (obj1, obj2) {
        if (obj1.length === 0) {
            return obj2 == null || this.isEqual(obj1, obj2);
        }

        obj2 = toArray(obj2);

        if (obj2.length > obj1.length) {
            return false;
        }

        return obj2.every(item2 =>
            obj1.some(item1 => this.isEqual(item1, item2))
        );
    },

    /**
     * 判断obj1是否包含obj2
     * @param {Object} obj1 obj1
     * @param {*} obj2 obj2
     * @return {boolean} obj1是否包含obj2
     */
    isContainObject: function (obj1, obj2) {
        // 对象就判断对应属性是否相等即可
        let obj2Keys = Object.keys(obj2);

        if (obj2Keys.length > Object.keys(obj1).length) {
            return false;
        }

        return obj2Keys.every(key => this.isEqual(obj1[key], obj2[key]));
    },

    /**
     * 判断两者是否相等
     *
     * @param {*} obj1 被检测项
     * @param {*} obj2 检测项
     * @return {boolean} 是否相等
     */
    isEqual: function (obj1, obj2) {
        // 经此判断之后，后续的基本数据类型都可直接返回false
        if (obj1 === obj2) {
            return true;
        }

        let obj1Instance = this.instance(obj1);
        // 两者原型不同时，不相等
        if (obj1Instance !== this.instance(obj2)) {
            return false;
        }

        switch (obj1Instance) {
            case 'Array':
                return this.isEqualArray(obj1, obj2);
            case 'Object':
                return this.isEqualObject(obj1, obj2);
            default:
                // boolean number string null undefined
                // 回头补上Date和RegEx
                // number补上NaN和-0 +0的情况
                return false;
        }
    },

    /**
     * 判断两个数组是否相等
     *
     * @param {Array} obj1 被检测项
     * @param {Array} obj2 检测项
     * @return {boolean} 是否相等
     */
    isEqualArray: function (obj1, obj2) {
        // 数组需要判断长度是否相等，数组对应位置的元素是否相等
        if (obj1.length !== obj2.length) {
            return false;
        }

        return obj1.every((key, i) => this.isEqual(obj1[i], obj2[i]));
    },

    /**
     * 判断两个Object是否相等
     *
     * @param {Object} obj1 被检测项
     * @param {Object} obj2 检测项
     * @return {boolean} 是否相等
     */
    isEqualObject: function (obj1, obj2) {
        // 对象就判断对应属性是否相等即可
        let obj2Keys = Object.keys(obj2);
        // 当不是部分相等模式时，需要对各属性值做完全匹配
        if (obj2Keys.length !== Object.keys(obj1).length) {
            return false;
        }

        return obj2Keys.every(key => this.isEqual(obj1[key], obj2[key]));
    },

    /**
     * 获取对象原型名称
     *
     * @param {*} obj 要获取原型的对象
     * @return {string} 原型名称
     */
    instance: function (obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    },

    /**
     * 判断是否为Object
     *
     * @param  {*}  obj 待判断的对象
     * @return {boolean} 是否为Object
     */
    isObject: function (obj) {
        return this.instance(obj) === 'Object';
    }
};

function setKey(obj, key, value) {
    obj[key] = value;
    return obj;
}

function toArray(obj) {
    return Array.isArray(obj) ? obj : [obj];
}

function append(arr1, arr2) {
    return arr2.reduce((arr1, item2) => {
        arr1.push(item2);
        return arr1;
    }, arr1);
}
