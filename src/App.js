import React from 'react'
import Router from './router/router'
// 引入路由配置文件
import routes from './router/index'

class app extends React.Component{
  render(){
    return (
      <Router routes={routes}></Router>
    )
  }
}
export default app