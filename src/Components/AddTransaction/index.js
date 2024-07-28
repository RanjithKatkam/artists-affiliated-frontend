import { Component } from "react";
import Navbar from "../Navbar";
import "./index.css";

class AddTransaction extends Component {
    state = {
        type: "credit",
        amount: "",
        description: "",
        date: "",
        balance: 0,
        transactionStatus: "",
    };

    componentDidMount() {
        const getData = async () => {
            try {
                const response = await fetch("https://artists-affiliated.onrender.com/transactions");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();
                if (responseData.length > 0) {
                    this.setState({ balance: responseData.reverse()[0].running_balance });
                }
            } catch (error) {
                console.error("Error fetching transactions: ", error);
            }
        };
        getData();
    }

    onChangeType = (e) => {
        this.setState({ type: e.target.value });
    };
    onChangeAmount = (e) => {
        this.setState({ amount: e.target.value });
    };
    onChangeDesc = (e) => {
        this.setState({ description: e.target.value });
    };
    onChangeDate = (e) => {
        this.setState({ date: e.target.value });
    };

    onClickAddTransaction = async (e) => {
        e.preventDefault();
        const { type, amount, description, date } = this.state;
        const transactionAmount = parseInt(amount);
        const runningAmount = type === "credit" ? this.state.balance + transactionAmount : this.state.balance - transactionAmount;
        const transaction = {
            type: type,
            amount: transactionAmount,
            description: description,
            date: date,
            running_balance: parseInt(runningAmount),
        };
        const api = "https://artists-affiliated.onrender.com/add-transaction";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transaction),
        };

        try {
            const response = await fetch(api, options);
            if (response.ok) {
                this.setState({
                    transactionStatus: "Transaction Added Successfully",
                    type: "credit",
                    amount: "",
                    description: "",
                    date: "",
                    balance: runningAmount,
                });
            } else {
                this.setState({ transactionStatus: "Error Adding Transaction", type: "credit", amount: "", description: "", date: "" });
            }
        } catch (error) {
            console.error("Error Adding Transaction: ", error.message);
            this.setState({ transactionStatus: error.message });
        }
    };

    render() {
        return (
            <div className="transactions-main-container">
                <Navbar />
                <div className="add-transaction-container">
                    <h1>New Transaction</h1>
                    <form onSubmit={this.onClickAddTransaction} className="form">
                        <label htmlFor="select">Transaction Type</label>
                        <select value={this.state.type} onChange={this.onChangeType} id="select">
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                        <label htmlFor="amount">Amount</label>
                        <input value={this.state.amount} onChange={this.onChangeAmount} id="amount" type="number" placeholder="Enter amount" />
                        <label htmlFor="desc">Description</label>
                        <textarea value={this.state.description} onChange={this.onChangeDesc} id="desc" placeholder="Enter description" />
                        <label htmlFor="date">Date</label>
                        <input value={this.state.date} onChange={this.onChangeDate} id="date" type="date" />
                        <p>{this.state.transactionStatus}</p>
                        <div>
                            <button type="submit" className="save">
                                Save
                            </button>
                            <button className="cancel">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddTransaction;
