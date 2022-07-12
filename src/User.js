import React from "react";
class User extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const {user} = this.props;

        return (
            <>
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </>
        );
    }
}

export default User;