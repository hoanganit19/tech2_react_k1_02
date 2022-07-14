import React from 'react';

class MemberInfo extends React.Component{
    constructor(props){
        super(props);
        //this.props.name = 'Tech2';
        this.state = {
            name: this.props.name,
            email: this.props.email
        }
    }

    changeInfo = () => {
        this.setState({
            name: 'Tech2',
            email: 'an@tech2.vn'
        })
    }

    render(){
        return (
            <>
                <h1>Tên: {this.state.name}</h1>
                <h2>Email: {this.state.email}</h2>
                <button type='button' onClick={this.changeInfo}>
                    Change Info
                </button>
            </>
        );
    }
}

export default MemberInfo;