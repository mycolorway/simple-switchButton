simple-switchButton
=============

一个基于 [Simple Module](https://github.com/mycolorway/simple-module) 的开关组件。

### 如何使用

#### 下载并引用

通过 `bower install` 下载依赖的第三方库，然后在页面中引入这些文件：

```html
<link rel="stylesheet" type="text/css" href="[style path]/switchButton.css" />
<script type="text/javascript" src="[script path]/jquery.min.js"></script>
<script type="text/javascript" src="[script path]/module.js"></script>
<script type="text/javascript" src="[script path]/switchButton.js"></script>
```

#### 初始化配置

在使用 simple-switchButton 的 HTML 页面里应该有一个对应的 checkbox 元素，例如：

```html
<input class="check-box" type="checkbox">
```

我们需要在这个页面的脚本里初始化 simple-select：

```javascript
simple.switchButton({
    el: $('.checkbox'),        // * 必须
    cls: ""                   // 额外的 class, 默认为空
});
```

### 方法和事件

初始化之后，switchButton 实例会暴露一些公共方法供调用：

#### 公共方法

**switch(Boolean: flag)**

切换开关状态。flag 为 true 时开启开关，为 false 时关闭开关，不传入flag参数时，切换开关状态。

**destroy()**

恢复到初始化之前的状态。


#### 事件

**switch**

触发条件：开关的状态发生改变。


