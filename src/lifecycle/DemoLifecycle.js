import React from 'react';
import ReactDOM from 'react-dom/client';

export default class DemoLifecycle extends React.Component{
    constructor(props){
        super(props);
        console.log('Constructor');
        this.state = {
            counter: 0
        }
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    handeChange = () => {
        this.setState({
           counter: this.state.counter+1
        })

        // const rootContent = ReactDOM.createRoot(document.querySelector('.content'));
        
        // if (this.state.counter===5){
        //     rootContent.unmount();
        // }
    }

    render(){
        console.log('Render');

        return (
            <>
                <div className='content'>
                    <h1>{this.state.counter}</h1>
                </div>
                <button type='button' onClick={this.handeChange}>Change</button>
            </>
        );
    }

    //Lần 1 sau khi Render()
    componentDidMount(){
        console.log('componentDidMount');
    }

    //Lần 2 sau khi render()
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }

    //Loại bỏ khỏi DOM
    componentWillUnmount(){
        console.log('Loại bỏ khỏi DOM');
    }
}

/*
1. constructor():
- Khai báo props
- Khai báo state

2. render()
- Không được setState

3. componentDidMount()
- Call API
- setState

4. componentDidUpdate()
- Xử lý dữ liệu sau khi render lần 1
- Chạy từ lần 2 trở đi

5. componentWillUnMount()

Loại bỏ khỏi DOM
*/