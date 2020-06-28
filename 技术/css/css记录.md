### 盒模型

```css
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
```

padding-box：（已从规范中移除）width包括内容和padding

border-box：即便设置了padding或border也不会改变元素的宽度和高度

content-box：会改变（标准盒模型）

inherit：使元素继承父级的box-sizing规则



低版本IE默认使用怪异模式，即border-box



### 清除浮动

仅在float布局需要（可以考虑使用flex布局）

伪类添加clear: both;（闭合浮动）

```css
.clearfix{}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```



### 宽高比

```
.box {
  background: #333;
  width: 50%;
}
.box::before {
  content: '';
  padding-top: 100%;
  float: left;
}
.box::after {
  content: '';
  display: block;
  clear: both;
}
```

- `padding-top: 100%;` 设置伪元素的内上边距，这里的百分比的值是按照宽度计算的，所以会呈现为一个响应式的元素块。
- 此方法还允许将内容正常放置在元素内。





### Flex

#### flex和inline-flex

```css
/* 
	flex        宽度默认100%
	inline-flex 根据子元素自适应
*/
display: flex | inline-flex
```

#### flex-direction

```css
flex-direction: row(default) | row-reverse | column | column-reverse
```

#### flex-wrap

```css
/*
	wrap 		 与flex-direction方向相同
	wrap-reverse 与flex-direction方向相相反(左下开始)
*/
flex-wrap: nowrap(default) | wrap | wrap-reverse
```

#### flex-flow

```css
flex-flow: <flex-direction> || <flex-wrap>
```

#### justify-content

```css
/*
	space-between 两端对齐，中间间隔相等
	space-around  每个块两侧相等，类似padding
*/
justify-content: flex-start(default) | flex-end | center | space-between | space-around
```

#### align-items

```css
/*
	** 多行对齐方式 **
	baseline 项目的第一行文字的基线对齐
	stretch  如果项目未设置高度或设为auto，将拉长占满整个容器的高度
*/
align-content: flex-start | flex-end | center | space-between | space-around | stretch(default)
```

#### 项目属性

```css
/*
	** 多行对齐方式 **
	order       排列顺序，值越小越靠前（可相同，可负数）
	flex-grow   项目放大比例 默认0 box按照值大小等分
	flex-shrink 项目缩小比例 默认1 若为0则此项不缩小（无负数）
	flex-basis  没有则auto为width 超出自动shrink 受maxminwidth影响			            见https://www.jianshu.com/p/17b1b445ecd4
	flex        grow, shrink, basis的简写 (默认0 1 auto)
	align-self  单个项目与其他不一样的对齐方式，覆盖align-items
*/
flex-basis: <length> | auto; /* default auto */
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
align-self: auto(default) | flex-start | flex-end | center | baseline | stretch
```



### CSS选择器系列

基本选择器

| 选择器          | 含义         |
| --------------- | ------------ |
| *               | 通配符选择器 |
| #id             | id选择器     |
| .class          | 类选择器     |
| a[href="a.com"] | 属性选择器   |
| :hover          | 伪类选择器   |
| tag             | 标签选择器   |
| ::before        | 伪元素选择器 |

组合选择器

| 选择器 | 含义             |
| ------ | ---------------- |
| AB     | AB同时具有       |
| A, B   | A或 / 和B        |
| A B    | B是A的后代元素   |
| A > B  | B是A的直接子元素 |
| A + B  | B是A的后一个     |
| A ~ B  | B是A的后N个      |



#### 优先级

内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

!import高于内联选择器

> 优先级是由 `A` 、`B`、`C`、`D` 的值来决定的，其中它们的值计算规则如下：
>
> 1. 如果存在内联样式，那么 `A = 1`, 否则 `A = 0`;
> 2. `B` 的值等于 `ID选择器` 出现的次数;
> 3. `C` 的值等于 `类选择器` 和 `属性选择器` 和 `伪类` 出现的总次数;
> 4. `D` 的值等于 `标签选择器` 和 `伪元素` 出现的总次数 

**比较规则是: 从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的**



伪类，伪元素

| 选择器          | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| a:link          | 匹配所有未被点击的链接                                       |
| a:visited       | 匹配所有已被点击的链接                                       |
| a:hover         | 匹配鼠标悬停其上的a元素                                      |
| a:active        | 匹配鼠标已经其上按下、还没有释放的a元素                      |
| li:first-child  | 匹配父元素的第一个子元素li                                   |
| li:last-child   | 匹配父元素的最后一个子元素li                                 |
| li:nth-child(n) | 匹配父元素的第n个子元素li（odd奇数，even偶数）               |
|                 |                                                              |
| E::before       | 在E元素内创建一个子元素，插入生成的内容作为伪元素，放在最前面 |
| E::after        | 在E元素内创建一个子元素，插入生成的内容作为伪元素，放在最后面 |
| E::selection    | 应用于文档中被用户高亮的部分（比如使用鼠标选中的部分）       |
| E::first-letter | 匹配E元素的第一个字母/第一行的第一个字母                     |
| E::first-line   | 匹配E元素的第一行                                            |



https://www.itcodemonkey.com/article/2853.html CSS基础题



### 问答

#### CSS 有哪些样式可以给子元素继承

- 可继承的:`font-size`,`font-weight`,`line-height`,`color`,`cursor`等
- 不可继承的一般是会改变盒子模型的:`display`,`margin`、`border`、`padding`、`height`等

#### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

- 行内: `input`,`span`,`a`,`img`以及`display:inline`的元素
- 块级: `p`,`div`,`header`,`footer`,`aside`,`article`,`ul`以及`display:block`这些
- void: `br`, `hr`

#### CSS3实现一个扇形

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>扇形</title>
	<style>
        .sector {
          width: 0;
          height: 0;
          border: 50px solid transparent;
          border-left-width: 20px;
          border-right-width: 20px;
          border-top-color: red;
          border-radius: 20px;
        }
</style>
</head>
<body>
	<div class="sector"></div>
</body>

</html>

```

#### 盒模型

```css
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
```

padding-box：（已从规范中移除）width包括内容和padding

border-box：即便设置了padding或border也不会改变元素的宽度和高度

content-box：会改变（标准盒模型）

inherit：使元素继承父级的box-sizing规则



低版本IE默认使用怪异模式，即border-box

#### 清除浮动

仅在float布局需要（可以考虑使用flex布局）

伪类添加clear: both;（闭合浮动）

在父元素后添加内容content，清除浮动

```css
.clearfix{}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```

BFC（block formatting context）

1.通常的做法是设置父元素 `overflow: auto` 或者设置其他的非默认的 `overflow: visible` 的值

当你使用这个属性只是为了创建BFC的时候，你可能会发现一些不想要的问题，比如滚动条或者一些剪切的阴影，需要注意。另外，对于后续的开发，可能不是很清楚当时为什么使用`overflow`。所以你最好添加一些注释来解释为什么这样做

2.display: flow-root

创建无副作用的BFC。在父级块中使用 `display: flow-root` 可以创建新的BFC

#### animate如何停留最后一帧

```
animation-fill-mode: forwards;
<!--backwards则停留在首帧,both是轮流-->
```

#### 水平垂直居中的方法
水平居中
1.定宽块级

```
.center{
    width:200px;
    margin:0 auto;
}
```

2.不定宽块级
```
.center {
    display:table;
    margin:0 auto;
}
.center {
    text-align:center;
    .child {
    	display:inline-block;
    }
}
.center {
	display:flex;
	justify-content:center;
}
```

垂直居中
1.单行文本
```
.center {
	padding-top: x
	padding-bottom: x
}
.center {
	height: x
	line-height: x
}
```
2.多行文本
```
.center {
	diaplay:table;
	.child {
		display:table-cell;
		verticle-align:middle;
	}
}
```
3.块级元素
flex

```
.center {
    display: flex;
    align-items: center;
}
```
position+transform
```
.center {
	width
	height
	position:relative;
	.child {
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%, -50%)
	}
}
```