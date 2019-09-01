import React from 'react'
import Title from '../../common/title/title'
import './newsDetai.scss'
import API from '../../../common/js/api'
class Detail extends React.Component {
    constructor() {
        super()
        this.state = {
            detail: [],
            storyExttra:{}
        }
    }
    componentDidMount() {
        const CancelToken = this.$http.CancelToken;
        this.source = CancelToken.source();
        // 文章ID
        this.storieId = this.props.match.params.id
        this.$http({
            url: API.news + "/" + this.storieId,
            method: "get",
            cancelToken: this.source.token
        }).then(d => {
            this.setState({
                detail: d.data
            },()=>{
                // 获取新闻额外信息
                this.$http({
                    url : API.storyExttra + this.storieId,
                    method:"get",
                    cancelToken: this.source.token
                }).then(d=>{
                    this.setState({
                        storyExttra : d.data
                    })
                })
            })
            let con = document.querySelector(".con");
            con.innerHTML = this.state.detail.body;
            let imgHolder = document.querySelector('.img-place-holder');
            let img = `<div class="mask"></div><img src="${this.state.detail.image}"/> <p>${this.state.detail.title}</p> <span>${this.state.detail.image_source}</span>`;
            imgHolder.innerHTML = img;
        })
    }
    componentWillUnmount(){
        this.source.cancel()
    }
    render() {
        return (
            <div className="main detail">
                <link rel="stylesheet" href={this.state.detail.css}/>
                <Title isDetail={true} {...this.props} storyExttra={this.state.storyExttra} detail={this.state.detail}></Title>
                <div className="con"></div>
            </div>
        )
    }
}
export default Detail