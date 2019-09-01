import React from 'react'
import './title.scss'
import userIcon from '../../../assets/img/20300542906549142354718375657_s.jpg'
import { NavLink } from 'react-router-dom'
class Title extends React.Component {
    constructor() {
        super()
        this.endY = 0
        this.state = {
            detail: {},
            isCollect: false
        }
    }
    toBack() {
        this.props.history.go(-1)
    }
    toComment() {
        this.props.history.push("/comments/" + this.props.match.params.id)
    }
    start() {
        this.endY = 0;
    }
    move(ev) {
        this.endY = ev.touches[0].clientX
        if (ev.target.className === "side-bar") {
            ev.preventDefault()
        }
    }
    showSide() {
        if (this.endY == 0) {
            this.refs.sideBar.setAttribute("class", "side-bar show")
        }
    }
    end(ev) {
        if (this.endY == 0 && ev.target.className === 'side-bar show') {
            this.refs.sideBar.setAttribute("class", "side-bar")
        }
    }
    componentWillReceiveProps(nextProps) {
        // 不是详情页
        if(!nextProps.detail)return;
        let detail = {
            id: nextProps.detail.id,
            title: nextProps.detail.title,
            images: nextProps.detail.image
        }
        this.setState({
            detail
        }, () => {
            // 页面加载先取数据
            let arr = localStorage.getItem("stories") ? JSON.parse(localStorage.getItem("stories")) : new Array()
            // 判断存储空间是否有此条数据
            let collect = arr.some(item => item.id === this.state.detail.id)
            this.setState({
                isCollect : collect
            })
        })
    }
    // 收藏
    collect() {
        let arr = localStorage.getItem("stories") ? JSON.parse(localStorage.getItem("stories")) : new Array()
        // 未收藏
        if (!this.state.isCollect) {
            arr.push(this.state.detail)
            this.setState({
                isCollect : true
            })
        }else{
            // 已收藏
            let i = arr.findIndex(item=>item.id === this.state.detail.id)
            arr.splice(i,1)
            this.setState({
                isCollect : false
            })
        }
        localStorage.setItem("stories", JSON.stringify(arr))
    }
    toCollect(){
        this.props.history.push("/collect")
    }
    render() {

        return (
            <div className="page-title">
                {/* 侧边栏 */}
                <div className="side-bar" ref="sideBar" onTouchMove={(ev) => this.move(ev)} onTouchEnd={(ev) => this.end(ev)} onTouchStart={() => this.start()}>
                    {/* swiper */}
                    <div className="side-list" id="swiper">
                        <div className="user-ifm">
                            <img src={userIcon} alt="" />
                            <h4>tacc</h4>
                            <p>
                                <span onTouchEnd={()=>this.toCollect()}><i className="iconfont icon-shoucang1"></i>我的收藏</span>
                                <span style={{ "float": "right", "paddingRight": "1rem" }}><i className="iconfont icon-icon-"></i>离线下载</span>
                            </p>
                        </div>
                        <ul className="side-nav">
                            <li>
                                <NavLink to="/index" activeClassName="select"><i className="iconfont icon-home"></i>首页</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="left-icon">
                    {
                        this.props.isIndex ? <i className="iconfont icon-caidan" onTouchEnd={() => this.showSide()}></i>
                            : <i className="iconfont icon-fanhui" onTouchEnd={() => this.toBack()}></i>
                    }
                </div>
                <h3>{this.props.title}</h3>
                {
                    this.props.isIndex ? <div className="right-icon">
                        <i className="iconfont icon-icon_notice"></i>
                        <i className="iconfont icon-gengduo"></i>
                    </div> : null
                }
                {
                    this.props.isDetail ? <div className="right-icon">
                        <i className="iconfont icon-fenxiang"></i>
                        <i className={this.state.isCollect ? 'iconfont icon-shoucang1' : 'iconfont icon-shoucang'} onTouchEnd={() => this.collect()}></i>
                        <i className="iconfont icon-linedesign-01" onTouchEnd={() => this.toComment()} >
                            <span>{this.props.storyExttra.short_comments}</span>
                        </i>
                        <i className="iconfont icon-dianzan">
                            <span>{this.props.storyExttra.popularity}</span>
                        </i>
                    </div> : null
                }
            </div>
        )
    }
}
export default Title