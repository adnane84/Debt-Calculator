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
      paidAll: 0,
      loanFree: false,
    };
  }

  handleChange = (e) => {
    this.setState({ input: parseFloat(e.target.value) });
  };

  onClick = () => {
    this.calcTotal();
    if (this.state.input.toFixed(2) === this.state.paidAll) {
      this.freeDebtMessage();
    } else if (this.state.input > this.state.paidAll) {
      alert(
        ` We have noticed that the payment amount entered is greater than the loan amount. This input is not valid as it is not possible to pay more than what is owed.`
      );
    } else if (this.state.input >= this.state.minimumDue.toFixed(2)) {
      this.paymentsHistory();
      this.updatePay();
      this.component.current.computeData();
    } else {
      alert(
        `Please enter a payment amount that is equal to or greater than the minimum monthly due. ${this.state.minimumDue.toFixed(
          2
        )}`
      );
    }
  };

  paymentsHistory = () => {
    this.setState((prevState) => ({
      history: [
        ...prevState.history,
        {
          paymentNumber: prevState.history.length + 1,
          id: Date.now(),
          label: this.state.input,
          totalPaid: this.state.totalPaid,
          balance: this.state.loanLeft,
        },
      ],
    }));
  };

  updatePay = () => {
    this.setState({ totalPaid: this.state.totalPaid + this.state.input });
  };
  getData = (minimumPay, debt, paidAll) => {
    this.setState({
      minimumDue: minimumPay,
      loanLeft: debt.toFixed(2),
      paidAll: paidAll.toFixed(2),
    });
  };
  calcTotal = () => {
    let calcTotal = this.state.loanLeft * 1 + this.state.minimumDue * 1;
    this.setState({ paidAll: calcTotal.toFixed(2) });
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
      paidAll: 0,
      loanFree: false,
    });

    this.component.current.reset();
  };
  render() {
    let { history, totalPaid, input, minimumDue, loanLeft, paidAll } =
      this.state;

    const loanFreeMessage = this.state.loanFree ? "is-visible" : "";

    return (
      <header className="App-header">
        <Entries ref={this.component} payment={input} getData={this.getData} />
        
        <div className={`modal ${loanFreeMessage}`}>
          <h1>
            Dear User, Congratulations! Based on the information provided, it
            appears that your loan has been fully paid off. Thank you for using
            our debt calculator to track your loan progress. If you have any
            questions or need further assistance, please do not hesitate to
            contact us. Best regards, The Debt Calculator Team
          </h1>
          <button class="button" onClick={this.reset}>
            Start a New Loan
          </button>
        </div>
        <div className="main-container">
        <div className="pay container">
          <h3 className="title">Payments</h3>
          <input
            type="number"
            step="0.01"
            min={minimumDue.toFixed(2)}
            max={loanLeft}
            value={input}
            placeholder="$ 00.0"
            onChange={this.handleChange}
          />
          <button className="button" onClick={this.onClick}>
            Make a Payment
          </button>
          <div className="title">
            Minimum Monthly Payment :{" "}
            <span className="digits">$ {minimumDue.toFixed(2)}</span>
          </div>
          <div className="text-payments">
            {" "}
            New Loan: <span className="digits">$ {paidAll}</span>
          </div>
        </div>
        <div className="history container">
          <h3 className="title">Payments Report</h3>
          <tbody>
            {history.map((payment, index) => (
              <tr key={index}>
                <td>{payment.paymentNumber}</td>
                <td>{payment.id}</td>
                <td>{payment.label}</td>
                <td>{payment.totalPaid}</td>
                <td>{payment.balance}</td>
              </tr>
            ))}
          </tbody>
          <h5 className="title">Total Amount Paid:</h5>
          <span className="digits">$ {totalPaid.toFixed(2)}</span>
        </div>
        </div>
        
        
      </header>
    );
  }
}

export default PaymentDue;
