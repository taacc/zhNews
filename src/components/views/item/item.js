import React from 'react'
class Item extends React.Component {


    toDetail(ev, id, end) {
        if (end == 0) {
            this.props.props.history.push("/newsDetail/" + id)
        }
    }
    start() {
        // 判断是否滚动
        this.end = 0;
    }
    move(ev) {
        this.end = ev.touches[0].clientX
    }
    render() {
        return (
            <div>
                <ul>
                    {this.props.stories.map((storie, index) => {
                        return (
                            <li key={index}
                                onTouchMove={(ev) => this.move(ev)}
                                onTouchStart={() => this.start()}
                                onTouchEnd={(ev) => this.toDetail(ev, storie.id, this.end)}
                            >
                                <h4>{storie.title}</h4>
                                <img src={storie.images} alt="" />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default Item