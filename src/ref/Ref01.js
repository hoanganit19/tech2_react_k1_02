import React from "react";

export default class Ref01 extends React.Component{
    constructor(props){
        super(props);

        this.titleRef = React.createRef();

        this.usernameRef = React.createRef();
    }

    componentDidMount(){
        this.usernameRef.current.focus();
    }

    handleChange = () => {
        // const title = document.querySelector('.title');
        // title.style.color = 'red';
        // title.style.fontStyle = 'italic';
        console.log(this.titleRef.current.innerText);
        this.usernameRef.current.value = 'Tech2';
        this.usernameRef.current.style.border = '1px solid red';
        this.usernameRef.current.style.outline = 'none';
        this.usernameRef.current.focus();
    }

    render(){
        return (
            <>
                <input type="text" ref={this.usernameRef} name="username" placeholder="Username..." />
                <h1 className="title" ref={this.titleRef}>Tech2 Solutions</h1>
                <button type="button" onClick={this.handleChange}>Change</button>
            </>
        );
    }
}