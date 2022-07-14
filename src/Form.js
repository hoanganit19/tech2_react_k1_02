import React from 'react';

export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            msg: ''
        }
    }

    changeValue = (e) => {
        
        const data = {}

        data[e.target.name] = e.target.value;

        this.setState(data);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {username, password} = this.state;

        const errors = {};

        let msg = '';

        if (username===''){
            errors.username = 'Vui lòng nhập Username';
            // this.setState({
            //     errors: {
            //         username: ''
            //     }
            // })
        }

        if (password===''){
            errors.password = 'Vui lòng nhập Password';
        }

        //console.log(errors);

        if (Object.keys(errors).length){
            msg = 'Vui lòng kiểm tra các lỗi bên dưới';
        }

        this.setState({
            errors: errors,
            msg: msg
        })
    }

    render(){
      
        return (
            <>

                <form method='post' onSubmit={this.handleSubmit}>
                    {
                        this.state.msg!=='' ? <p style={{color: 'red'}}>{this.state.msg}</p>:false
                    }
                    <div>
                        <label>Username</label> <br/>
                        <input 
                        type="text" 
                        name="username" 
                        placeholder="Username..." 
                        defaultValue={this.state.username}
                        onChange={this.changeValue}
                        />
                        <br/>
                        {
                            this.state.errors.username ? <span style={{color: 'red'}}>{this.state.errors.username}</span>: false
                        }
                        
                    </div>

                    <div>
                        <label>Password</label> <br/>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder="Password..."
                        onChange={this.changeValue}
                        />
                        <br/>
                        {
                            this.state.errors.password ? <span style={{color: 'red'}}>{this.state.errors.password}</span>: false
                        }
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </>
        );
    }
}