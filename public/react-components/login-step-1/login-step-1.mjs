/**
 * Utility to validate email. Might be moved to universal helper library file later.
 *
 * @param {string} _email -
 * @returns {boolean}
 */
const validateEmail = (_email) => {
  return String(_email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

class LoginStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: {
        email: '',
      },
      loginEmail: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmitStep1 = this.handleSubmitStep1.bind(this);
  }
  handleEmailChange(_event) {
    this.props.updateEmail(_event.target.value);
    this.setState({
      loginEmail: _event.target.value,
    });
  }
  handleSubmitStep1(_event) {
    _event.preventDefault();
    this.props.resetAlerts();
    if (!this.state.loginEmail) {
      this.setState({
        alerts: {
          email: <span className="alert">Email field is required</span>,
        },
      });
      return;
    }
    if (!validateEmail(this.state.loginEmail)) {
      this.setState({
        alerts: {
          email: <span className="alert">Email format is incorrect</span>,
        },
      });
      return;
    }
    this.props.changeStep(2);
  }
  render() {
    return (
      <form
        method="POST"
        onSubmit={ this.handleSubmitStep1 }
      >
        <div>
          <input
            name="loginEmail"
            placeholder="Email"
            type="text"
            value={this.state.loginEmail}
            onChange={this.handleEmailChange}
          />
        </div>
        <div>
          { this.state.alerts.email }
          { this.props.wrongLogin }
        </div>
        <div>
          <button
            className="btn"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default LoginStep1;
