import React from "react";
import Entries from "./Entries";

class PaymentDue extends React.Component {
  constructor(props) {
    super(props);

    this.component = React.createRef();
    this.state = {
      input: 0,
      history: [],
      totalPaid: 0,
      minimumDue: 0,
      loanLeft: 0,
      totalPayments: 0,
      loanFree: false,
    };
  }

  handleChange = (e) => {
    this.setState({ input: parseFloat(e.target.value) });
  };

  onClick = () => {
    this.calcTotal();

    if (this.state.input.toFixed(2) === this.state.totalPayments) {
      this.freeDebtMessage();
    } else if (this.state.input > this.state.totalPayments) {
      alert(`Your payment cannot be greater than the amount owe`);
    } else if (this.state.input >= this.state.loanLeft) {
      alert(`Your payment cannot be greater than your Remaining Debt. 
            If you want to payoff your entire loan, you must pay off Remaining Debt + Interest + a 1% Principal Payment.Current Payoff Total: $${this.state.totalPayments} `);
    } else if (this.state.input >= this.state.minimumDue.toFixed(2)) {
      this.createLi();
      this.updatePay();
      this.component.current.computeData();
    } else {
      alert(
        `Payments must be greater than or equal to ${this.state.minimumDue.toFixed(
          2
        )}`
      );
    }
  };

  createLi = () => {
    let newItem = {
      label: this.state.input,
      id: Date.now(),
    };

    this.setState((prevState) => ({
      history: [...prevState.history, newItem],
    }));
  };

  updatePay = () => {
    this.setState({ totalPaid: this.state.totalPaid + this.state.input });
  };
  getData = (minimumPay, debt, totalPayments) => {
    this.setState({
      minimumDue: minimumPay,
      loanLeft: debt.toFixed(2),
      totalPayments: totalPayments.toFixed(2),
    });
  };
  calcTotal = () => {
    let calcTotal = this.state.loanLeft * 1 + this.state.minimumDue * 1;
    this.setState({ totalPayments: calcTotal.toFixed(2) });
  };
  freeDebtMessage = () => {
    this.setState({ loanFree: true });
  };

  reset = () => {
    this.setState({
      input: 0,
      history: [],
      totalPaid: 0,
      minimumDue: 0,
      loanLeft: 0,
      totalPayments: 0,
      loanFree: false,
    });

    this.component.current.reset();
  };
  render() {
    let { history, totalPaid, input, minimumDue, loanLeft, totalPayments } = this.state;

    const modalVisible = this.state.loanFree ? "is-visible" : "";

    return (
      <header className="App-header">
        <div className={`modal ${modalVisible}`}>
          <h1>
            Congratulations! <br />
            Your Loan is Paid Off!
          </h1>
          <button class="button" onClick={this.reset}>
            Reset
          </button>
        </div>
        <div className="pay container">
          <h3>Payments</h3>
          <input
            type="number"
            step="0.01"
            min={minimumDue.toFixed(2)}
            max={loanLeft}
            value={input}
            placeholder="90"
            onChange={this.handleChange}
          />
          <button className="button" onClick={this.onClick}>
            Log Payment
          </button>
          <div className="subtext">Minimum Payment : {minimumDue.toFixed(2)}</div>
          <div className="subtext">Total Debt : {totalPayments}</div>
          <h3>Log</h3>
          <ul className="log">
            {history.map((item) => (
              <li key={item.id}>${item.label}</li>
            ))}
          </ul>
          <h5>Total Amount Paid:</h5>
          <span className="number-left">{totalPaid.toFixed(2)}</span>
        </div>
        <Entries ref={this.component} payment={input} getData={this.getData} />
      </header>
    );
  }
}

export default PaymentDue;
