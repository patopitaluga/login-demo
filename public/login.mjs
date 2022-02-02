import LoginSteps from './react-components/login-steps/login-steps.mjs';

/* <div v-if="vdLoggingIn">
Please wait a moment.
</div> */

class LoginForm extends React.Component {
  render() {
    return (
  <aside className="login">
    <div className="login__logo">
      Logo
    </div>

    <p className="login__title">
      Log in to your account.
    </p>
    <LoginSteps/>
  </aside>
    )
  }
};

ReactDOM.render(
  <LoginForm/>,
  document.getElementById('app')
);
