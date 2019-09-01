## React高仿知乎日报

### 知乎日报API
> https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90

### 声明
>『知乎』是 知乎. Inc 的注册商标。本软件与其代码非由知乎创作或维护。软件中所包含的信息与内容皆违反版权与知乎用户协议。本项目所有文字  图片等稿件内容均由知乎提供，获取与共享之行为或有侵犯知乎权益的嫌疑。若被告知需停止共享与使用，本人会及时删除整个项目。请您了解相关 情况，并遵守知乎协议。

### 技术栈
> React + React-router-dom + axios + scss + ant-design

### 已实现的功能
- 首页新闻懒加载
- 首页侧边菜单
- 新闻收藏
- 详情页
- 评论页

### devDependencies
``` javascript
    "devDependencies": {
    "antd": "^3.22.2",
    "axios": "^0.19.0",
    "node-sass": "^4.12.0",
    "qs": "^6.8.0",
    "react-router-dom": "^5.0.1"
  }
```
### 使用方法
``` javascript
    npm install
    npm start 
```

### 知乎接口跨域问题
配置package.json
``` javascript
    "proxy": "https://news-at.zhihu.com/api/4/"
```
### 图片防盗链
``` javascript
    <meta name="referrer" content="no-referrer" />
```

