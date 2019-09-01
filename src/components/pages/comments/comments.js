import React from 'react'
import API from '../../../common/js/api'
import './comments.scss'
import utils from '../../../utils/utils'
import Title from '../../common/title/title'
class Comment extends React.Component {
    constructor() {
        super()
        this.id = 0
        this.isLoad = true
        this.state = {
            storyExttra: {},
            totalExttra: 0,
            longComments: [],
            shortComments: [],
            isShowShortComm: false
        }
    }
    componentDidMount() {
        // 请求评论数据
        const CancelToken = this.$http.CancelToken;
        this.source = CancelToken.source();
        this.id = this.props.match.params.id;
        this.$http({
            url: API.storyExttra + this.id,
            method: "get",
            cancelToken: this.source.token
        }).then(d => {
            this.setState({
                storyExttra: d.data,
                totalExttra: d.data.long_comments + d.data.short_comments
            })
        })

        // 新闻长评论
        this.$http({
            url: API.longComments(this.id),
            method: 'get',
            cancelToken: this.source.token
        }).then(d => {
            this.setState(() => ({
                longComments: d.data.comments
            }))
        })

    }
    loadShortComm() {
        // window.scrollTop = 0;
        // 滚动到可视位置
        
        // 新闻短评论
        this.setState({
            isShowShortComm: !this.state.isShowShortComm
        })
        if (this.isLoad) {
            this.isLoad = false;
            this.$http({
                url: API.shortComments(this.id),
                method: 'get',

            }).then(d => {
                this.isLoad = true;
                this.setState({
                    shortComments: d.data.comments
                },()=>{
                    document.querySelector(".short").scrollIntoView({
                        behavior:"smooth"
                    })
                })
            })
        }
    }
    componentWillUnmount() {
        this.source.cancel()
    }
    render() {
        return (
            <div>
                <Title {...this.props} title={`共${this.state.totalExttra}条点评`}></Title>
                <div className="main">
                    <div className="comment">
                        <h3>{this.state.storyExttra.long_comments}条长评</h3>
                        <div className="comment-con">
                            {this.state.storyExttra.long_comments === 0 ? <div className="not-data">暂无长评</div> :
                                <ul>
                                    {
                                        this.state.longComments.map(item => {
                                            return (
                                                <li key={item.id} className="comment-list">
                                                    <div className="icon">
                                                        <img src={item.avatar} alt="" />
                                                    </div>
                                                    <div className="con-hero">
                                                        <h4>{item.author}</h4>
                                                        <p>{item.content}</p>
                                                        <p className="comm-info">
                                                            <span className="comm-time">{utils.transTimeMill(item.time)}</span>
                                                            <span className="toggleBtn">展开</span>
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            }
                        </div>                        <h3 className="short" onTouchEnd={() => this.loadShortComm()}>{this.state.storyExttra.short_comments}条短评</h3>
                        {this.state.isShowShortComm ?
                            <div className="comment-con">
                                <ul>
                                    {
                                        this.state.shortComments.map(item => {
                                            return (
                                                <li key={item.id} className="comment-list">
                                                    <div className="icon">
                                                        <img src={item.avatar} alt="" />
                                                    </div>
                                                    <div className="con-hero">
                                                        <h4>{item.author}</h4>
                                                        <p>{item.content}</p>
                                                        <p className="comm-info">
                                                            <span className="comm-time">{utils.transTimeMill(item.time)}</span>
                                                            <span className="toggleBtn">展开</span>
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        )
    }
}
export default Comment