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

返回多个Object或多个Array的并集

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