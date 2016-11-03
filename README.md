# booleanjs

booleanjs是一个为Object和Array进行布尔运算（交/并/补）的轻量级工具库。

## 使用说明
目前兼容commonjs AMD 以及普通的加载方式

### commonjs/AMD
使用npm进行安装
```bash
npm install booleanjs
```

```javascript
var bool = require('booleanjs');
```

### 普通加载
使用script标签引入

```HTML
<script src="path/to/booleanjs/dist/boolean.min.js"></script>
````

```javascript
var bool = window.bool;
```

## API

下面是bool的方法列表：
- [same](#same)
- [merge](#merge)
- [exclude](#exclude)
- [isEqual](#isEqual)
- [isContain](#isContain)

### same

```javascript
{Object|Array} same({Object|Array}obj, ...{Object|Array|null}objs)
```

返回多个Object或多个Array的交集

**注：** 第一个参数必须是{Object}或者是{Array}，否则会报错

当第一个参数为{Object}时，objs可传入的值为：
- {Array} 要保留的属性keys数组，如：['a', 'b', 'c']，会将不在该数组里的属性移除；
- {Object} 普通对象，只有属性name和value都分别相等时，该属性才会保留下来；
- {null|undefined} 空参数，直接将该参数忽略

#### Example

```javascript
// a = {b: 2};
var a = bool.same(
    {a: 1, b: 2, c: 3},
    {a: 1, b: 2},
    {b: 2, c: 4}
);

// a = {b: 2};
var a = bool.same(
    {a: 1, b: 2, c: 3},
    ['b', 'c'],
    {a: 1, b: 2}
);
```

当第一个参数为{Array}时，objs可传入的值为：
- {Array} 普通数组，则返回与该数组拥有共同元素的数组，元素顺序与obj中的顺序保持一致；
- {null|undefined} 空参数，直接将该参数忽略

#### Example

```javascript
// a = ['1', 2];
var a = bool.same(
    ['1', 2, '3'],
    [2, 4, '1']
);

// a = [];
var a = bool.same(
    ['1', 2, '3'],
    [2, '1'],
    [1]
);
```

### merge

```javascript
{Object|Array} merge({Object|Array}obj, ...{Object|Array|null}objs)
```

返回多个Object或多个Array的并集

当第一个参数为{Object}时，效果跟Object.assign类似，区别在于，当属性的value为{Object}或{Array}时，不会对该属性做拷贝。

objs能传入的值为：
- {Object} 普通对象
- {null|undefined} 忽略该参数

#### Example

```javascript
var a = {b: 1};
var x = {d: 1, e: a};

// c = {d: 2, e: {b: 1}, f: 3}
// c === x
var c = bool.merge(
    x,
    {d: 2},
    {f: 3}
);

// c = {d: 2, e: {b: 2}, f: 3}
a.b = 2;
```

当第一个参数为{Array}时，objs可传入的值为：
- {Array} 普通数组，会首先将该数组中与obj重复的的元素过滤，再将剩余的元素append到obj中，同时返回obj数组；
- {null|undefined} 忽略该参数

#### Example

```javascript
var a = [1, 2, 3, 4];

// b = [1, 2, 3, 4, 7, 6]
// a === b
var b = bool.merge(
    a,
    [7, 4, 1],
    [2, 6]
);
```

### exclude

```javascript
{Object|Array} exclude({Object|Array}obj, ...{Object|Array}objs)
```

返回obj与objs的补集

当第一个参数为{Object}时，objs可传入的值为：
- {Array} 要保留的属性keys数组，如：['a', 'b', 'c']，会将在该数组里的属性移除；
- {Object} 普通对象，只有属性name和value都分别相等时，该属性才会被移除；
- {null|undefined} 空参数，直接将该参数忽略

#### Example

```javascript
// a = {d: 4}
var a = bool.exclude(
    {a: 1, b: 3, c:3, d: 4},
    {c: 4, d: 4},
    ['a', 'b']
);
```

当第一个参数为{Array}时，objs可传入的值为：
- {Array} 普通数组，则排除与该数组拥有共同元素的数组，元素顺序与obj中的顺序保持一致；
- {null|undefined} 空参数，直接将该参数忽略

#### Example

```javascript
// a = [2]
var a = bool.exclude(
    [1, 2, 3, 4],
    [3, 1, 7],
    [1, 4, 6]
);
```

### isEqual

```javascript
{boolean} isEqual({*}obj1, {*}obj2)
```

判断两个对象是否深度相等，应该跟underscore实现的差不多

** 注 ** 无法判断function类型

#### Example

```javascript
// true
var a = bool.isEqual({}, {});

// false
var a = bool.isEqual(-0, +0);

// true
var a = bool.isEqual(NaN, NaN);
```

### isContain

```javascript
{boolean} isContain({*}obj1, {*}obj2)
```

判断obj1是否包含obj2

```javascript
// true
var a = bool.isContain({}, null);

// true
var a = bool.isContain({a: 1, b: {c: 2}}, {b: {c: 2}});

// true
var a = bool.isContain([1, 2, 3, 4], [4, 3]);
```
