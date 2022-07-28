import React from "react";
export default class Ref02 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            customers: []
        }

        this.checkAllRef = React.createRef();
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
        this.checkboxItemRef.forEach(checkItem => {
            checkItem.current.checked = checkboxStatus;
        })
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
                            <p><input ref={this.checkboxItemRef[customer.id]} type="checkbox" value={customer.id} /> {customer.name}</p>
                            </React.Fragment>
                        );
                    })
                }
            </>
        );
    }
}