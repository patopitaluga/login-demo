class LoginStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: {
        password: '',
      },
      loginPassword: '',
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitStep2 = this.handleSubmitStep2.bind(this);
  }
  handlePasswordChange(_event) {
    this.props.updatePassword(_event.target.value);
    this.setState({
      loginPassword: _event.target.value,
    });
  }
  handleSubmitStep2(_event) {
    _event.preventDefault();
    if (!this.state.loginPassword) {
      this.setState({
        alerts: {
          password: <span className="alert">Password field is required</span>,
        },
      });
      return;
    }

    this.props.submitLogin();
  }
  render() {
    return (
      <form
        method="POST"
        onSubmit={ this.handleSubmitStep2 }
      >
        <div>
          <input
            name="loginPassword"
            placeholder="Password"
            type="password"
            value={this.state.loginEmail}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div>
          { this.state.alerts.password }
        </div>
        <div>
          <button
            className="btn"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default LoginStep2;
