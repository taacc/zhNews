import React from 'react'
import Title from '../../common/title/title'
import News from '../../common/news/news'
import './index.scss'
import { Carousel } from 'antd'
import API from '../../../common/js/api'
import utils from '../../../utils/utils'
class index extends React.Component {
    constructor() {
        super()
        this.isload = true;
        this.state = {
            title: "首页",
            // 请求日期
            storiesId: "",
            // 当前日期距离现在的天数
            distDay: 0,
            stories: [],
            img: []
        }
    }

    start() {
        // 判断是否滚动
        this.end = 0;
    }
    move(ev) {
        this.end = ev.touches[0].clientX
    }

    toDetail(ev, id, end) {
        if (end == 0) {
            this.props.history.push("/newsDetail/" + id)
        }
    }
    // 获取上一天stories
    getBeforeStories() {
        if (this.isload) {
            this.isload = false;
            this.$http({
                url: API.before + this.state.storiesId,
                method: "get",
                cancelToken: this.source.token
            }).then(d => {
                // 天数++
                this.state.distDay++;
                this.isload = true
                // 将上一天数据添加到数据
                this.setState({
                    storiesId: d.data.date,
                    stories: this.appendStories(d)
                })
            })
        }

    }
    // 添加stories
    appendStories(d) {
        let stories = this.state.stories;
        stories.push({
            storiesTitle: utils.transTime(this.state.distDay),
            stories: d.data.stories
        })
        return stories
    }
    componentDidMount() {
        const CancelToken = this.$http.CancelToken;
        this.source = CancelToken.source();
        // 今日新闻
        if (this.isload) {
            this.isload = false;
            this.$http({
                url: API.latest,
                method: "get",
                cancelToken: this.source.token
            }).then(d => {
                this.isload = true
                // 添加请求日期
                this.setState({
                    storiesId: d.data.date,
                    stories: this.appendStories(d),
                    img: d.data.top_stories
                }, () => {
                    // 请求上一天数据
                    this.getBeforeStories();
                })
                
                // 回调里
                window.onscroll = () => {
                    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    let wh = window.screen.height;
                    let dh = document.documentElement.offsetHeight;
                    if (scrollTop + wh + 50 >= dh) {
                        this.getBeforeStories()
                    }
                    //title
                    let h3s = document.querySelectorAll(".list h3 ");
                    let title = document.querySelector(".page-title")
                    let arr = [];
                    if (h3s[0].getBoundingClientRect().top - title.offsetHeight >= 0) {
                        this.setState({
                            title: "首页"
                        })
                    } else {
                        // 改变title
                        for (let i = 0; i < h3s.length; i++) {
                            if (h3s[i].getBoundingClientRect().top - title.offsetHeight <= 0) {
                                this.setState({
                                    title: h3s[i].innerHTML
                                })
                            }
                        }
                    }

                }
            })
        }

    }
    componentWillUnmount() {
        window.onscroll = null
        // 取消页面所有ajax请求
        this.source.cancel()

    }
    render() {
        return (
            <div className="main">
                <Title title={this.state.title} isIndex={true} {...this.props}></Title>
                <Carousel autoplay="true">
                    {
                        this.state.img.map(item => {
                            return (
                                <div key={item.id} className="top-stories"
                                    onTouchMove={(ev) => this.move(ev)}
                                    onTouchStart={() => this.start()}
                                    onTouchEnd={(ev) => this.toDetail(ev, item.id, this.end)}>
                                    <div className="mask"></div>
                                    <img src={item.image} />
                                    <p>{item.title}</p>
                                </div>
                            )
                        })
                    }
                </Carousel>
                <News stories={this.state.stories} {...this.props}></News>
            </div>
        )
    }
}
export default index