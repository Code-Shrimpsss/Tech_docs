---
description: Css 常见面试题记录。
id: intro-css
title: Css 常见面试题
tags:
    - CSS
    - Code
    - interviews
    - 前端面试
    - Front-end

sidebar_position: 2
---

### 盒模型宽度计算

1. content width:内容宽度,仅包含内容本身的宽度,不包含任何内边距、边框和外边距。
2. padding width:内补白宽度,内容宽度加上左右内边距的宽度。
3. border width:内容宽度加上左右内边距和左右边框的宽度。
4. margin width:内容宽度加上左右内边距、左右边框和左右外边距的宽度。

可以用以下公式表示:

-   content width = width
-   padding width = width + left padding + right padding
-   border width = width + left padding + right padding + left border + right border
-   margin width = width + left padding + right padding + left border + right border + left margin + right margin

它的默认值为 content-box，即指定 width 属性值为内容宽度，盒子的实际宽度为内容宽度 + 内边距 + 边框。

### 外边距重叠

什么是外边距重叠:
外边距重叠(margin collapsing)是指相邻元素的外边距在某些情况下会合并(折叠)为单个外边距。
外边距重叠只发生在垂直方向，水平方向不会重叠。浮动的元素和绝对定位的元素的外边距不会折叠.

如何解决：

1. 使用 padding 代替 margin，由于 padding 不会与其他元素的 margin 重叠,所以可以使用 padding 来代替 margin,避免重叠问题。
2. margin-bottom 为 0，为相邻元素的 margin-bottom 设置为 0,则它不会与下一个元素的 margin-top 重叠。
3. 添加 border，添加 border 也可以避免外边距重叠,因为 border 与 margin 不会重叠
4. 设置 float，float 元素的外边距不会重叠,所以可以通过 float 避免重叠问题。例如:
5. 设置 position，绝对定位元素的外边距不会与其他元素的外边距重叠,所以也可以用来解决重叠问题。
6. 使用 Flexbox 或 Grid，Flex 子项和 Grid 子项的外边距也不会重叠,这些布局都可以利用来解决外边距重叠问题。

### 外边距塌陷

外边距塌陷(margin collapse)是指两个相邻元素的外边距合并为更大的那个外边距

如何解决外边距塌陷

1. 为父元素设置 overflow: auto/hidden
2. 为父元素设置浮动
3. 为父元素设置 display: inline-block
4. 为父元素设置 border: 1px solid transparent
5. 为父元素设置 padding: 1px

### 清除浮动的方法有哪些？

1.  隔墙法：在浮动元素的父元素末尾添加一个空的标签，并设置`clear:both` 样式
2.  overflow 法：给父元素添加 `overflow:hidden` 属性
3.  单伪元素法：给父元素添加 `after` 伪元素
4.  双伪元素法：给父元素添加 `after` 与 `before` 两个伪元素

### 清除浮动

清除浮动(clear float)的目的是为了 修复浮动元素带来的影响,主要包括:

1. 父元素高度塌陷: 当子元素设置浮动后,子元素会脱离普通文档流,使得父元素无法感知到子元素的高度,导致父元素高度为 0。
2. 后续元素不能环绕:当子元素浮动后,其后的非浮动元素会重新排列,并环绕在浮动元素的周围。但如果后续元素也设了浮动,则它们无法环绕前面的浮动元素,两者会并排浮动,导致布局乱掉。

为了解决以上问题,我们需要清除浮动， 常见的清除浮动的方法有:

1. 清除浮动容器:在浮动元素的父元素末尾添加空的清除浮动元素,清除浮动。例如:

```html
<div style="overflow: hidden;">
	<div style="float: left;">浮动元素1</div>
	<div style="float: left;">浮动元素2</div>
	<div style="clear: both;"></div>
</div>
```

2. 触发 BFC:通过触发父元素的 BFC,可以清除内部浮动元素的影响。例如:

```html
<div class="parent">
	<div style="float: left;">浮动元素1</div>
	<div style="float: left;">浮动元素2</div>
</div>

# css .parent { overflow: hidden; /* 触发 BFC */ }
```

3. 使用伪元素清除浮动:在父元素末尾使用伪元素::after 并设置 clear:both。例如:

```css
.parent::after {
	content: '';
	display: block;
	clear: both;
}
```

### BFC

BFC(Block Formatting Context)是块级格式化上下文。
它是一个独立的渲染区域，只有 Block-level box 参与， 它规定了内部的 Block-level Box 如何布局，并且与外部毫不相干。

BFC 的几个特点:

1. 内部的盒子会在垂直方向上一个接一个的放置。
2. 属于同一个 BFC 的两个相邻 Box 的 margin 会发生折叠。
3. BFC 的区域不会与 float 元素区域重叠。
4. 计算 BFC 的高度时,浮动子元素也参与计算。
5. BFC 就是页面上的一个隔离的独立容器,容器内部的子元素不会影响外部的元素。

常见的触发 BFC 的方式:

1. float 的值不是 none。
2. overflow 的值不是 visible。
3. display 的值是 inline-block、table-cell、table-caption 或者 flex。
4. position 的值是 absolute 或者 fixed。

BFC 的作用主要在于:

1. 隔离浮动:通过 BFC 可以清除内部浮动的影响,防止浮动 ElementException 子元素影响外部内容。
2. 自适应两栏布局:利用浮动+BFC 可以实现自适应的两栏布局。
3. 清除内部元素 margin 重叠。
4. 可以包含 float 的元素。

以下是一些 BFC 示例:

利用 overflow 触发 BFC,清除浮动影响

```css
.container {
	overflow: hidden; /* 触发 BFC */
}
```

使用 float+BFC 实现自适应两栏布局

```css
.left {
	float: left;
	width: 60%;
}
.right {
	overflow: hidden; /* 触发 BFC */
}
```

使用 margin 重叠的 BFC

```css
.container {
	overflow: hidden; /* 触发 BFC */
	margin-bottom: 20px;
}
.inner {
	margin-bottom: 10px;
}
```

    container设置overflow触发BFC,防止margin重叠,所以.inner的margin生效,实际margin为10px

### 实现元素的水平垂直居中的多种方式

1. 使用绝对定位和负边距给父元素设置 position: relative,给子元素设置 position: absolute,left: 50%,top: 50%,并给子元素相同的负边距:

```css
.parent {
	position: relative;
}
.child {
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -50px; /* 宽度的一半 */
	margin-top: -50px; /* 高度的一半 */
}
```

2. 使用绝对定位和 viewport unidades
   同样给父元素设置 position: relative,给子元素设置 position: absolute 和 left: 50vw, top: 50vh,然后通过 translate 来定位:

```css
.parent {
	position: relative;
}
.child {
	position: absolute;
	left: 50vw;
	top: 50vh;
	transform: translate(-50%, -50%);
}
```

3. Flex 布局如果子元素是 Flex 容器的唯一子元素,可以这样设置:

```css
.parent {
	display: flex;
	justify-content: center;
	align-items: center;
}
```

4. Grid 布局 Grid 也可以轻松实现居中:

```css
.parent {
	display: grid;
	justify-items: center;
	align-items: center;
}
```

5. viewport 和 translate 不使用定位,可以给子元素设置 left: 50% 和 top: 50%,再用 translate 来定位:

```css
.child {
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
```

6. 使用 CSS calc()函数可以计算出子元素的左外边距和父元素的宽度之差的一半来居中:

```css
.parent {
	position: relative;
}
.child {
	position: absolute;
	left: 50%;
	margin-left: calc(50% - 50px); /*50px是子元素的宽度的一半*/
}
```

### 视口单位

CSS 视口单位(Viewport units)是相对于视口(viewport)大小来定值的单位。

常见的视口单位有:

1. vw: 视口宽度的 1/100, `1vw = viewport width / 1002` .
2. vh: 视口高度的 1/100,`1vh = viewport height / 1003`.
3. vmin: vw 和 vh 中较小的那个, 可适应不同屏幕的视口尺寸。
4. vmax: vw 和 vh 中较大的那个, 可适应不同屏幕的视口尺寸。

视口单位的优点:

1. 响应式: 视口单位的值会随着视口尺寸的变化而变化，非常适合响应式布局。
2. 简单易用: 直接使用 vw、vh、vmin、vmax 等单位值,而不需要媒体查询。
3. 高度灵活: 可以设置元素的宽度、高度、外边距等,配合 max-width 使用效果更佳。

视口单位的使用场景:

1. 设置元素的宽度,如:
    ```css
    .box {
    	width: 10vw; /* 视口宽的10% */
    }
    ```
2. 设置元素的高度,如:
    ```css
    .box {
    	height: 5vh; /* 视口高的5% */
    }
    ```
3. 设置外边距或填充,如:
    ```css
    .box {
    	margin: 3vmin; /* vw和vh中较小值的3% */
    }
    ```
4. 和 max-width 一起使用,如:
    ```css
    .box {
    	width: 80vw;
    	max-width: 1200px;
    }
    ```

### 分析比较 opacity: 0、visibility: hidden、display:none 优劣和适用场景。

### flex:1 是什么意思？

实际代表的三个属性的简写，分别是 flex-grow:0；flex-shrink:1;flex-basis:auto;

-   `flex-grow`是用来增大盒子的，比如，当父盒子的宽度大于子盒子的宽度，父盒子的剩余空间可以利用 flex-grow 来设置子盒子增大的占比
-   `flex-shrink`用来设置子盒子超过父盒子的宽度后，超出部分进行缩小的取值比例
-   `flex-basis`是用来设置盒子的基准宽度，并且 basis 和 width 同时存在 basis 会把 width 干掉

实际代表的三个属性的简写，分别是 用来增大盒子的 flex-grow:0; 用来设置子盒子超过父盒子宽度后超出部分缩小取值的 flex-shrink；还有用来设置盒子的基准宽度的 flex-basis；

### reset css 和 normalize.css 区别

-   Normalize 相对「平和」，注重通用的方案，重置掉该重置的样式，保留有用的 user agent 样式，同时进行一些 bug 的修复，这点是 reset 所缺乏的。
-   Reset 相对「暴力」，不管有没有用，统统重置成一样的效果，且影响的范围很大，讲求跨浏览器的一致性。
