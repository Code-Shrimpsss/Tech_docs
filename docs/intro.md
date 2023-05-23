---
description: JS 逻辑题手写记录。
id: doc-js-write-tags
title: JS 逻辑题记录
tags:
    - JavaScript
    - Code
    - interviews
    - 前端面试
    - Front-end
---

### ['1', '2', '3'].map(parseInt) 的结果是什么？

`parseInt(string [, radix])` 理论上基数 radix 应该为大于等于 2，小于等于 36 的数字， 否则会被当作不合法，返回 NaN。
但有一个值除外，那就是 0; parseInt 的第二个参数 radix 为 0 时，parseInt 会当作第二个参数没有传，所以字符串会被当成十进制。
如下：

```js
parseInt('1', 0);
// 1    特殊情况，等价于parseInt('1')
​
parseInt('2', 1);
// NaN  没有一进制这种东西
​
parseInt('3', 2);
// NaN  没能找到合法字符，虽然 3 是数字，但它无法用来表达二进制，二进制只能为 0 和 1。
```

所以返回结果为：[1, NaN, NaN]

### 介绍下深度优先遍历和广度优先遍历，如何实现？

##### 深度优先遍历

是指从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点的第一个未被访问的邻结点，然后再以此邻结点为顶点，继续找它的下一个顶点进行访问。重复此步骤，直至所有结点都被访问完为止。

###### 递归写法

步骤：

1. 如果结点不为空,则将该节点写入结点数组中
2. 获取该结点的所有子节点
3. 对所有子结点进行递归遍历
4. 返回结点数组

代码：

```js
function deepTraversal(node) {
	/*
	 * @param node{ children?: node | node[]; } : 根结点
	 * @return: nodes: 结点值的数组
	 */

	const nodes = [];
	if (node != null) {
		// 1
		nodes.push(node);
		let children = node.children; // 2
		for (let i = 0; i < children.length; i++) deepTraversal(children[i]); // 3
		return nodes; // 4
	}
}
```

##### 非递归写法

步骤：

1. 根结点入栈
2. 遍历栈,出栈一个结点并访问
3. 将该结点的子结点以倒序入栈
4. 重复步骤 2 和 3,直到栈为空

代码：

```js
function deepNotTraversal(node) {
	/*
	 * @param node{ children?: node | node[]; }: 根结点
	 * @return: nodes: 结点值的数组
	 */

	let nodes = [];
	if (node != null) {
		let stack = [];
		stack.push(node); // 1
		while (stack.length != 0) {
			let items = stack.pop();
			nodes.push(items); // 2
			let children = items.children;
			for (let i = children.length - 1; i >= 0; i--) {
				// 3
				stack.push(children[i]);
			}
		}
	}

	return nodes;
}
```

##### 广度优先遍历

是从某个顶点出发，首先访问这个顶点，然后找出刚访问这个结点所有未被访问的邻结点，访问完后再访问这些结点中第一个邻结点的所有结点，重复此方法，直到所有结点都被访问完为止。

###### 递归写法

```js
function wideTraversal(node) {
	/*
	 * @param node{ children?: node | node[]; }: 根节点
	 * @return: nodes: 节点值的数组
	 */

	let nodes = [],
		i = 0;

	if (node != null) {
		nodes.push(node);
		node = nodes[i++];
		let childrens = node.children;
		nodes.push(wideTraversal(childrens));
	}

	return nodes;
}
```

##### 非递归写法

```js
function wideNotTraversal(node) {
	/*
	 * @param node { children?: node | node[]; }: 根节点
	 * @return: nodes: 节点值的数组
	 */

	let nodes = [],
		index = 0;

	while (node != null) {
		nodes.push(node);
		node = nodes[index++];

		let childrens = node.children;
		for (let i = 0; i < childrens.length; i++) nodes.push(childrens[i]);
	}

	return nodes;
}
```

### 总结

-   深度优先遍历使用递归，从一个节点开始对子树进行深入访问，直到访问完所有子节点。
-   广度优先遍历使用队列，从一个节点开始访问该节点的所有子节点，然后对这些子节点的子节点依次进行访问，形成一层一层的遍历。

##### 方法选型

-   而相比于递归版本，非递归版本有两个优点：

1. 不会存在栈溢出的问题,更加节省调用栈空间。
2. 更符合迭代思想,易于理解。

因此，在实际项目中，除了最简单的场景，非递归版本的优先遍历算法往往更为实用

### 用广度和深度实现深拷贝

深度优先遍历

```js
const dfsDeepClone = function (origin) {
	if (origin == null) return origin;
	let target = Array.isArray(origin) ? [] : {};

	for (const key in origin) {
		if (origin.hasOwnProperty(key)) {
			if (typeof origin[key] === 'object') {
				target[key] = dfsDeepClone(target[key]);
			} else {
				target[key] = origin[key];
			}
		}
	}

	return target;
};
```

广度优先遍历
相较于深度，广度采用队列思想实现

```js
const wfs = function (origin) {
	if (origin == null) return origin;
	let target = Array.isArray(origin) ? [] : {};
	let queue = [origin];

	while (queue.length) {
		let curr = queue.shift();

		if (typeof curr === 'object') {
			for (const key in origin) {
				if (typeof curr[key] === 'object') {
					queue.push(curr[key]); // 入队，延后遍历
				} else {
					queue[key] = curr[key]; // 直接拷贝
				}
			}
		}
	}

	return target;
};
```

### 写一个 compose 并说明应用场景

compose 的好处如下：

1. 在 Express,Koa 等 Web 框架中,经常使用 compose 函数来组合多个中间件函数。
2. 管道操作。当我们需要对数据进行一系列连续的加工或转换时,可以使用 compose 将这些操作函数串联起来。

```js
const compose = (...args) => {
	return (num) => {
		return args.reduceRight((res, cb) => cb(res), num);
	};
};
```

ps：另一个 pip 函数是从左到右的方式，写法将 reduceRight 替换为 reduce 即可

### 实现一个柯里化函数

```js
function currying(fn) {
	function curryied(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function curryied2(...args2) {
				return curryied.apply(this, [...args, args2]);
			};
		}
	}
	return curryied;
}

const addPro = (...args) => {
	return args.reduce((pre, next) => pre + next, args[0]);
};

const addCurring = curryingT(addPro);

console.log(addCurring(0, 1, 2, 4, 6, 8)); // 21
```

### 实现一个防抖并优化为组件通用版

```js
function debounce(fn, delay) {
	let timer = null;
	return () => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, arguments);
		}, delay);
	};
}
```

功能型防抖

1. 具备立即执行功能，用于在首次点击时快速反馈
2. 具备取消功能，用于防止网络请求时间过长时，给用户提供取消功能
3. 具备函数返回值，用于给需要返回值的函数提供异步回调

```js
const debounceClick = debounce(handleClick, 300, false); // 异步回调模拟
const debounceCallBack = function (...args) {
	debounceClick.apply(this, args).then((res) => {
		console.log(res);
	});
};
debounceElement.onclick = debounceCallBack; // Promise 测试
cancelDebounceElement.onclick = () => {
	console.info('Cancel Successfully!');
	debounceClick.cancel();
};

// 功能型防抖
function debounce(fn, delay, immediate = false) {
	let timer = null;
	let isInvoke = false;

	function _debounce(...args) {
		return new Promise((resolve, reject) => {
			if (timer) clearTimeout(timer);

			if (immediate && !isInvoke) {
				try {
					const result = fn.apply(this, arguments);
					isInvoke = true;
					resolve(result);
				} catch (err) {
					reject(err);
				}
			} else {
				timer = setTimeout(() => {
					try {
						const reult = fn.apply(this, arguments);
						isInvoke = false;
						resolve(reult);
					} catch (error) {
						reject(error);
					}
				}, delay);
			}
		});
	}

	_debounce.cancel = function () {
		clearTimeout(timer);
		timer = null;
	};

	return _debounce;
}
```

### 实现一个节流并优化为组件通用版

```js
const throttle = function (fn, interval) {
	let nowTime;
	let lastTime = 0;

	function _throttle() {
		nowTime = new Date().getTime();
		if (nowTime - lastTime > interval) {
			fn();
			lastTime = nowTime;
		}
	}
	return _throttle;
};
```

功能型节流

1. 具备立即执行功能，用于在首次触发时快速反馈
2. 通过定时器检测，自动执行最后一次监听

```js
function throttle(fn, interval, loading = false, trailing = false) {
	let nowTime;
	let lastTime = 0;
	let timer = null;

	function _throttle(...args) {
		nowTime = new Date().getTime(); // 首次节流
		if (!loading && lastTime === 0) {
			lastTime = nowTime;
		}

		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		if (nowTime - lastTime > interval) {
			fn.apply(this, args);
			lastTime = nowTime;
			return;
		}

		if (trailing && !timer) {
			timer = setTimeout(() => {
				fn.apply(this, args);
				timer = null;
				lastTime = 0;
			}, interval - (nowTimer - lastTime));
		}
	}
	return _throttle;
}
```

### 使用递归的方式实现 flatten 函数

递归加闭包版本

```js
function wrap() {
	let reuslt = [];

	return function _flatten(array) {
		for (const iter of array) {
			if (iter.constructor === Array) {
				reuslt.concat(_flatten(iter));
			} else {
				reuslt.push(iter);
			}
		}
		return reuslt;
	};
}
```

### 实现一个 Sleep 函数的两种写法

循环阻塞写法（不推荐）

```js
const sleep = (ms) => {
	var start = new Date().getTime();
	while (new Date().getTime() - start < ms);
};
```

非循环阻塞写法，适用于支持 Promise 的场景（推荐）

```js
const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
```

### 实现整数逆转

用 JavaScript 写一个函数，输入 number 型，返回整数逆序后的字符串。
如：输入整型 1234，返回字符串“4321”。

要求：

1. 必须使用递归函数调用，不能用全局变量;
2. 输入函数必须只有一个参数传入，必须返回字符串。

代码：

```js
function reverseInt(num) {
	let num1 = num / 10,
		num2 = num % 10;

	if (num1 < 1) {
		return num;
	} else {
		num1 = Math.floor(num1);
		return `${num2}${reverseInt(num1)}`;
	}
}
```

### 实现旋转数组

题目：给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
示例 1：
输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3 输出: [5, 6, 7, 1, 2, 3, 4]
解释: 向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6] 向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5] 向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]

示例 2：
输入: [-1, -100, 3, 99] 和 k = 2 输出: [3, 99, -1, -100]
解释: 向右旋转 1 步: [99, -1, -100, 3] 向右旋转 2 步: [3, 99,-1, -100]

代码：

```js
function rotate(arr, k) {
	const _len = arr.length;
	const _step = k % len; // 边界处理-取余
	return arr.slice(-step).concat(arr.slice(0, len - step));
}
```

### 实现移动零

题目：给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:
输入: [0,1,0,3,12] 输出: [1,3,12,0,0]
复制代码说明：必须在原数组上操作，不能拷贝额外的数组。尽量减少操作次数
(考虑空间复杂度不考虑时间复杂度)

默认版代码：

```js
function zeroMove(arr) {
	let _len = arr.length,
		j = 0;

	for (let i = 0; i < _len - j; i++) {
		if (arr[i] === 0) {
			arr.push(0);
			arr.splice(i, 1);
			i--;
			j++;
		}
	}

	return arr;
}
```

双指针优化代码：

```js
function zeroMove(array) {
	let j = 0;
	for (let i = 0; i < array.length; i++) {
		if (array[i] !== 0) {
			array[j++] = array[i];
		}
	}

	for (let i = j; i < array.length; i++) {
		array[i] = 0;
	}

	return array;
}
```

### 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：

```js
let list = [
	{ id: 1, name: '部门 A', parentId: 0 },
	{ id: 2, name: '部门 B', parentId: 0 },
	{ id: 3, name: '部门 C', parentId: 1 },
	{ id: 4, name: '部门 D', parentId: 1 },
	{ id: 5, name: '部门 E', parentId: 2 },
	{ id: 6, name: '部门 F', parentId: 3 },
	{ id: 7, name: '部门 G', parentId: 2 },
	{ id: 8, name: '部门 H', parentId: 4 },
];
```

代码如下：

```js
function convert(arr) {
	let res = [];
	let map = arr.reduce((res, val) => ((res[val.id] = val), res), {});

	for (const item of arr) {
		if (item.parentId === 0) {
			res.push(item);
			continue;
		}

		if (item.parentId in map) {
			const parent = map[item.parentId];
			parent.children = parent.chilren || [];
			parent.children.push(item);
		}
	}
	return res;
}
```
