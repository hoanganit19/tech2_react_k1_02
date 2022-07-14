import React from 'react';
import Avatar from './Avatar';
import Posts from './Posts';

class Member extends React.Component{
    constructor(props){
        super(props);
    
    }

    render(){

        const {name, email, age, users, comments, avatar, posts} = this.props;

        const {image, attributes} = avatar;

        return (
            <>
                <h1>Tech2</h1>
                <p>
                    <Avatar image={image} attributes={attributes} />
                </p>
                <h2>Name: {name}</h2>
                <h2>Age: {age}</h2>
                <h2>Email: {email}</h2>
                <hr />
                <h2>Danh sách</h2>
                {users}
                <h2>Comments</h2>
                {comments}

                <h2>Bài viết đã đăng</h2>
                <button type='button'>Xoá bài đăng</button>
                <Posts {...this.props} />
            </>
        );
    }
}

export default Member;