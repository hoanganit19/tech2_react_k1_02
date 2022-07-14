import React from "react";

export default class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }

    upCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    downCount = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    render(){
        return (
            <>
                <h1>Count: {this.state.count}</h1>
                <button className="down" onClick={this.downCount}>-</button>
                <button className="up" onClick={this.upCount}>+</button>
            </>
        );
    }
}