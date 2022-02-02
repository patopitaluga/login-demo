
import LoginStep1 from './react-components/login-step-1/login-step-1.mjs';
import LoginStep2 from './react-components/login-step-2/login-step-2.mjs';

class LoginSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      loginEmail: '',
      loginPassword: '',
      alerts: {
        wrongLogin: '',
      },
    };

    this.changeStep = this.changeStep.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.resetAlerts = this.resetAlerts.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  changeStep(_toStep) {
    this.setState({
      step: _toStep,
    });
  }
  updateEmail(_updatedEmail) {
    this.setState({
      loginEmail: _updatedEmail,
      alerts: {
        wrongLogin: '',
      },
    });
  }
  updatePassword(_updatedPassword) {
    this.setState({
      loginPassword: _updatedPassword,
      alerts: {
        wrongLogin: '',
      },
    });
  }
  resetAlerts() {
    this.setState({
      alerts: {
        wrongLogin: '',
      },
    });
  }
  submitLogin() {
    fetch('/api/v0/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.loginEmail,
        password: this.state.loginPassword,
      }),
    })
      .then((_responseRaw) => {
        if (_responseRaw.status === 400) {
          this.setState({
            step: 1,
            alerts: {
              wrongLogin: <span className="alert">Incorrect email or password.</span>,
            },
          });
          return;
        }
        _responseRaw.json()
          .then((_response) => {
            window.localStorage.setItem('token', _response.jwt),
            window.location.replace('/user-info');
          });
      })
      .catch((_err) => {
        console.log(_err);
      });
  }
  render() {
    if (this.state.step === 1)
      return <LoginStep1
        changeStep={ this.changeStep }
        updateEmail={ this.updateEmail }
        wrongLogin={ this.state.alerts.wrongLogin }
        resetAlerts={ this.resetAlerts }
      />;
    return <LoginStep2
      updatePassword={ this.updatePassword }
      submitLogin={ this.submitLogin }
    />;
  }
}

export default LoginSteps;
