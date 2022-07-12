import React from "react";

class Comment extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const {title, content} = this.props;

        return (
            <div>
                <p>Title: {title}</p>
                <p>Content: {content}</p>
            </div>
        );
    }
}

export default Comment;