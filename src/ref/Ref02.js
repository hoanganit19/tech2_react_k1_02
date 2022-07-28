import React from "react";
export default class Ref02 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            customers: []
        }

        this.checkAllRef = React.createRef();

        this.checkCount = 0;

        this.buttonRef = React.createRef();
    }

    componentDidMount(){
        const customers = [
            {
                id: 1,
                name: '01'
            },

            {
                id: 2,
                name: '02'
            },

            {
                id: 3,
                name: '03'
            }
        ]

        this.checkboxItemRef = [];

        customers.forEach(customer => {
            this.checkboxItemRef[customer.id] = React.createRef();
        });

        this.setState({
            customers: customers
        })
    }

    handleCheckAll = () => {
        let checkboxStatus = this.checkAllRef.current.checked;

        if (checkboxStatus){
            this.checkCount = this.state.customers.length;
        }else{
            this.checkCount = 0;
        }

        this.renderCheckCount();

        this.checkboxItemRef.forEach(checkItem => {
            checkItem.current.checked = checkboxStatus;
        })
    }

    handeCheck = (e) => {

        //Áp dụng trong trường hợp bỏ check
        if (!e.target.checked){
            this.checkAllRef.current.checked = false;
            this.checkCount--;
            this.renderCheckCount();
            return; //Thoát hàm
        }

        //Xử lý trong trường hợp checked từng checkbox item
        let count = 0;
        let checkStatus = this.checkboxItemRef.every(checkbox => {
            if (checkbox.current.checked){
                count++;
            }
            return checkbox.current.checked;
        });

        this.checkCount = count;

        this.renderCheckCount();

        this.checkAllRef.current.checked = checkStatus;
    }

    renderCheckCount = () => {
        this.buttonRef.current.children[0].innerText = this.checkCount; 
        if (this.checkCount>0){
            this.buttonRef.current.removeAttribute('disabled');
        }else{
            this.buttonRef.current.setAttribute('disabled', 'disabled');
        }
        
    }

    render(){
        return (
            <>
                <p><input onChange={this.handleCheckAll} ref={this.checkAllRef} type="checkbox" className="check-all"/> Check All</p>
                <hr/>
                {
                    this.state.customers.map(customer => {
                        return (
                            <React.Fragment key={customer.id}>
                            <p><input ref={this.checkboxItemRef[customer.id]} type="checkbox" onChange={this.handeCheck} value={customer.id} /> {customer.name}</p>
                            </React.Fragment>
                        );
                    })
                }
                <button type="button" ref={this.buttonRef} disabled>Xoá (<span>0</span>)</button>
            </>
        );
    }
}