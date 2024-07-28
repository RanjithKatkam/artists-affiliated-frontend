import { Component } from "react";
import "./index.css";
import Navbar from "../Navbar";

class Transactions extends Component {
    state = {
        transactions: [],
        balance: 0,
    };

    componentDidMount() {
        const getData = async () => {
            const response = await fetch("https://artists-affiliated.onrender.com/transactions");
            const responseData = await response.json();
            this.setState({ transactions: responseData.reverse() });
            this.setState({ balance: responseData[0].running_balance });
        };

        getData();
    }

    render() {
        return (
            <div className="transactions-main-container">
                <Navbar />
                <h1 className="heading">Office Transactions</h1>
                <div className="transactions">
                    <ul className="list">
                        <li className="list-headers">
                            <h3>Date</h3>
                            <h3>Description</h3>
                            <h3>Type</h3>
                            <h3>Amount</h3>
                            <h3>Balance</h3>
                        </li>
                        {this.state.transactions.map((item) => (
                            <li className="list-headers item" key={item.id}>
                                <h3 className="trans-item light">{item.date}</h3>
                                <h3 className="trans-item italic">{item.description}</h3>
                                <h3 className={item.type === "credit" ? "trans-item green" : "trans-item red"}>{item.type}</h3>
                                <h3 className="trans-item">{item.amount}</h3>
                                <h3 className="trans-item">{item.running_balance}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Transactions;
