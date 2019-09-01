import React from 'react'
import '../../views/item/item'
import './news.scss'
import Item from '../../views/item/item';
class News extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollTop: []
        }
    }
    render() {
        return (
            <div className="news">
                {
                    this.props.stories.map(item => {
                        return (
                            <div className="list" key={item.storiesTitle}>
                                <h3>{item.storiesTitle}</h3>
                                <Item stories={item.stories} props={this.props}></Item>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default News