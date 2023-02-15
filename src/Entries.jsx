import React from "react";

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialDebt: 20000,
      initialInterest: 5,
      monthlyInterest: 0,
      debtLeft: 0,
      minimumDue: 0,
      paymentsLeft: 0,
    };
  }

  handleChange = (e) => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  captureData = () => {
    const { initialDebt, initialInterest } = this.state;
    let debt = initialDebt * 1;
    let monthlyIntPay = (initialInterest / 100 / 12) * debt;
    let minTotalPay = monthlyIntPay + debt * 0.01;
    let totalPayoff = minTotalPay + debt * 1;

    this.setState({
      monthlyInterest: (initialInterest / 100 / 12) * debt,
      debtLeft: debt * 1,
      minimumDue: minTotalPay,
      paymentsLeft: debt / minTotalPay,
    });

    this.props.getData(minTotalPay, debt, totalPayoff);
  };
  computeData = () => {
    if (this.state.debtLeft > 100) {
      const { initialInterest, debtLeft } = this.state;
      const { payment } = this.props;

      let monthlyIntPay = (initialInterest / 100 / 12) * debtLeft;
      let newMinPay = monthlyIntPay + debtLeft * 0.01;
      let principlePaid = payment - monthlyIntPay;
      let newDebt = debtLeft - principlePaid;
      let totalPayoff = newMinPay + newDebt;

      this.setState({
        monthlyInterest: (initialInterest / 100 / 12) * newDebt,
        debtLeft: newDebt * 1,
        minimumDue: newMinPay,
        paymentsLeft: newDebt / principlePaid,
      });

      this.props.getData(newMinPay, newDebt, totalPayoff);
    } else {
      const { debtLeft } = this.state;
      const { payment } = this.props;

      let newDebt = debtLeft - payment;
      let newMinPay = debtLeft * 0.01 + newDebt;
      let totalPayoff = debtLeft * 0.01 + newDebt;

      this.setState({
        debtLeft: newDebt * 1,
        minimumDue: newMinPay,
        paymentsLeft: newDebt / newMinPay,
      });

      this.props.getData(newMinPay, newDebt, totalPayoff);
    }
  };
  reset = () => {
    this.setState({
      initialDebt: 20000,
      initialInterest: 5,
      monthlyInterest: 0,
      debtLeft: 0,
      minimumDue: 0,
      paymentsLeft: 0,
    });
  };

  render() {
    const { initialDebt, initialInterest, debtLeft, minimumDue, paymentsLeft } =
      this.state;

    const inputData = [
      {
        header: "CURRENT LOAN BALANCE FOR LOAN",
        label: `$${initialDebt}`,
        name: "initialDebt",
        type: "range",
        min: "1000",
        max: "200000",
        value: initialDebt,
        step: "500",
        onChange: this.handleChange,
        className: "range-style",
        id: "debtRange",
      },
      {
        header: "APR (ANNUAL PERCENTAGE RATE) ",
        label: `${initialInterest}%`,
        name: "initialInterest",
        type: "range",
        min: "1",
        max: "30",
        value: initialInterest,
        step: "0.1",
        onChange: this.handleChange,
        className: "range-style",
        id: "interestRange",
      },
    ];
    return (
      <div className="main-container">
        <div className="inputs container">
          {inputData.map((item) => (
            <div>
              <h2 className="loan-slider">{item.header}</h2>
              <div className="total digits">{item.label}</div>
              <input
                name={item.name}
                type={item.type}
                min={item.min}
                max={item.max}
                value={item.value}
                step={item.step}
                onChange={item.onChange}
                className={item.className}
                id={item.id}
              />
            </div>
          ))}

          <button className="button" onClick={this.captureData}>
            Calculate
          </button>
        </div>
        <div className="loan-infos container">
          <div>
            <h4 className="title">Loan Balance: </h4>
            <h5 className="info">Original Debt minus principal paid</h5>
            <span className="digits">${debtLeft.toFixed(2)}</span>
            <hr />
            <h4 className="title">My monthly payment is: </h4>
            <h5 className="info">
              Monthly interest plus 1% payment on principal
            </h5>
            <h5 className="info">
              My interest rate is per month:{" "}
              <span className="digits">
                {" "}
                ${this.state.monthlyInterest.toFixed(2)}
              </span>
            </h5>
            <hr />
            <span className="digits">${minimumDue.toFixed(2)}</span>
            <h4 className="title">Number of Payments Left:</h4>
            <h5 className="info">Based on last monthly payment</h5>
            <span className="digits">{paymentsLeft.toFixed(1)}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Entries;
