---
nav:
  path: /components
group:
  title: 反馈
  order: 12
toc: false
---

#  Skeleton 骨架屏
在需要等待加载内容的位置提供一个占位图形组合
## 何时使用
- 网络较慢需要长时间等待加载，且只在第一次加载的时候使用；
- 在确保手机性能的前提下，尽量使用预加载，最好不用骨架屏；
- 适用于图文信息较多且重要的首页、列表、卡片中，小的模块类组件（例如弹窗）不要使用；

## 代码示例
### 基本使用
<code src='pages/Skeleton/index'></code>

## 属性

#### Skeleton
| 属性 | 说明 | 类型 | 默认值 |
| -----|-----|-----|----- |
| animate | 是否展示动画效果 | `boolean` | `false` | 
| avatar | 是否显示头像占位图 | `boolean` | `false` | 
| className | 类名 | `string` | - | 
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | `boolean`  | `true` | 
| rows | 段落行数，大于0展示 |  `number` | `3` | 
| style | 样式 | `string` | - | 
| title | 是否显示标题占位图 | `boolean` | `true` | 

#### Avatar 头像

| 属性 | 说明 | 类型 | 默认值 |
| -----|-----|-----|----- |
| animate | 是否展示动画效果 | `boolean` | `false` | 
| className | 类名 | `string` | - | 
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | `boolean`  | `true` |
| shape | 头像形状 | `'circle' \| 'square'` | `'square'` | 
| size | 头像大小 | `string` | `44` | 
| style | 样式 | `string` | - | 

#### Paragraph 段落

| 属性 | 说明 | 类型 | 默认值 |
| -----|-----|-----|----- |
| animate | 是否展示动画效果 | `boolean` | `false` | 
| className | 类名 | `string` | - | 
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | `boolean`  | `true` |
| rows | 段落行数，大于0展示 | `number` | `3` | 
| style | 样式 | `string` | - | 

#### Title 标题

| 属性 | 说明 | 类型 | 默认值 |
| -----|-----|-----|----- |
| animate | 是否展示动画效果 | `boolean` | `false` | 
| className | 类名 | `string` | - | 
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | `boolean`  | `true` |
| style | 样式 | `string` | - | 

#### Button 按钮

| 属性 | 说明 | 类型 | 默认值 |
| -----|-----|-----|----- |
| animate | 是否展示动画效果 | `boolean` | `false` | 
| className | 类名 | `string` | - | 
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | `boolean`  | `true` |
| style | 样式 | `string` | - | 

#### Input 输入框

| 属性 | 说明 | 类型 | 默认值 |
| -----|-----|-----|----- |
| animate | 是否展示动画效果 | `boolean` | `false` | 
| className | 类名 | `string` | - | 
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | `boolean`  | `true` |
| style | 样式 | `string` | - | 

#### Custom 自定义组件，添加标准容器和动画样式

| 属性 | 说明 | 类型 | 默认值 |
| -----|-----|-----|----- |
| animate | 是否展示动画效果 | `boolean` | `false` | 
| className | 类名 | `string` | - | 
| loading | 为 true 时，显示占位图。反之则直接展示子组件 | `boolean`  | `true` |
| style | 样式 | `string` | - | 