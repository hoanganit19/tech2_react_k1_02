import React from "react";
class Users extends React.Component{
    constructor(props){
        super(props);
        
        //Khởi tạo 1 lần
        this.state = {
            users: [],
            isLoading: true
        }

    }

    componentDidMount = () => {
        const getUsers = fetch('http://localhost:3004/users');
    
        getUsers.then(response => response.json()).then(users=>{
            this.setState({
                users: users,
                isLoading: false
            })

            // setTimeout(()=>{
            //     this.setState({
            //         isLoading: false
            //     })
            // }, 1000)
        })
    }

    // loadUsers = () => {
    //     const getUsers = fetch('http://localhost:3004/users');
    
    //     getUsers.then(response => response.json()).then(users=>{
    //         this.setState({
    //             users: users
    //         })
    //     })

        
    // }

    render(){

        const users = this.state.users.map(user => {
                return (
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                    </div>
                );
            })
        

        return (
        <>
            <button type="button" onClick={this.loadUsers}>Tải danh sách</button>
            <h2>Danh sách người dung</h2>
            {
                this.state.isLoading?<h3>Đang tải...</h3>: users 
            }
    
        </>
        );
    }
}

export default Users;