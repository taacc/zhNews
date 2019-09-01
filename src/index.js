import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './assets/js/rem'
// ant-design
import 'antd/dist/antd.css';
// 重置样式
import './assets/css/reset.css'
import './assets/font/iconfont.css'
import axios from 'axios'
import * as serviceWorker from './serviceWorker';
React.Component.prototype.$http = axios

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
