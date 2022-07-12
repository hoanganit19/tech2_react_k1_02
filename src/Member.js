import React from 'react';
import Avatar from './Avatar';

class Member extends React.Component{
    constructor(props){
        super(props);
    
    }

    render(){

        const {name, email, age, users, comments} = this.props;

        return (
            <>
                <h1>Tech2</h1>
                <p>
                    <Avatar 
                    image="https://picsum.photos/200"
                    width="100"
                    />
                </p>
                <h2>Name: {name}</h2>
                <h2>Age: {age}</h2>
                <h2>Email: {email}</h2>
                <hr />
                <h2>Danh sách</h2>
                {users}
                <h2>Comments</h2>
                {comments}
            </>
        );
    }
}

export default Member;