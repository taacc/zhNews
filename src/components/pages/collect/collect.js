import React from 'react'
import Item from '../../views/item/item'
import Title from '../../common/title/title'
import './collect.scss'
class Collect extends React.Component {
    constructor() {
        super()
        this.stories = []
        this.state = {
            stories: []
        }
    }
    componentDidMount() {
        let stories = localStorage.getItem("stories") ? JSON.parse(localStorage.getItem("stories")) : new Array()
        this.setState({
            stories
        })
    }
    render() {
        return (
            <div>
                <Title {...this.props} title={`共${this.state.stories.length}条收藏`}></Title>
                <div className="news collect">
                    {this.state.stories.length!=0?<Item stories={this.state.stories} props={this.props}></Item> : '暂无收藏'}
                </div>
            </div>
        )
    }
}
export default Collect