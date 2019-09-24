import React from "react";
import Head from "../components/Head";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { signUp, confirmSignUp, resendSignUp } from '../utils/auth'
import { withTranslation } from '../i18n'

import '../src/sass/main.scss'
import '../src/sass/main-public.scss'
import '../src/sass/index.scss'

class Authentication extends React.Component {
  getInitialProps = async () => ({
    namespacesRequired: ['public'],
  })

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      verificationCode: "",
      authState: 'SIGN_UP',
      errorAuthCode: null,
      successAuthCode: null,
      user: null,
    };

    this.resendSignUp = this.resendSignUp.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSignUp = e => {
    e.preventDefault();
    this.signUp()
  };
  async signUp() {
    let state = await signUp(this.state.email, this.state.password)
    this.setState(state)
  }

  async onConfirmSignUp(e) {
    console.log(e)
    let state = await confirmSignUp(this.state.email, e)
    this.setState(state)
  };

  async resendSignUp() {
    let state = await resendSignUp(this.state.email)
    this.setState(state)
  }

  render() {
    const { email, password, authState } = this.state;
    const { onChange } = this;

    let disableEmailPassword = false
    if(authState === 'CONFIRM_CODE') {
      disableEmailPassword = true
    }

    return (
      <section>
        <HeaderMenu />
        <Head title="Get Started | Lidbot" />
        <div className="main">
          <div>
            <div>
              <img
                src="/static/icons/logo.png"
                alt="lidbot logo"
                className="logo"
              />
            </div>
            <div className="welcome-image">
              <img
                src="/static/images/login_waste.png"
                alt="lidbot waste logo"
                className="waste"
              />
            </div>
          </div>
          <div>
            <h1>{this.props.t('title')}</h1>
            <p>{this.props.t('subtitle')}</p>

            <If condition={authState === 'SIGN_UP'}>
              <form onSubmit={e => this.onSignUp(e)}>
                <If condition={this.state.errorAuthCode}>
                  <div className="notification error">
                    {this.props.t(this.state.errorAuthCode)}
                  </div>
                </If>
                <If condition={this.state.successAuthCode}>
                  <div className="notification info">
                    {this.props.t(this.state.successAuthCode)}
                  </div>
                </If>
                <label htmlFor="email" className={disableEmailPassword ? 'disabled' : 'enabled'}>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    autoFocus
                    value={email}
                    disabled={disableEmailPassword}
                    onChange={e => onChange(e)}
                    placeholder="you@example.com"
                  />
                </label>
              <label htmlFor="password" className={disableEmailPassword ? 'disabled' : 'enabled'}>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                    disabled={disableEmailPassword}
                    onChange={e => onChange(e)}
                    placeholder={this.props.t('enter-password')}
                  />
                </label>
              <button type="submit">{this.props.t('sign-up-button')}</button>
              <div className="link-label link-label--bottom">
                {this.props.t('sign-up-local-notice')}
                <a href="https://lidbot.com/terms-of-service" target="_blank">{this.props.t('terms')}</a>
                {this.props.t('and-our')}
                <a href="https://lidbot.com/privacy" target="_blank">{this.props.t('privacy')}</a>
              </div>
            </form>
            </If>
            <If condition={authState === 'CONFIRM_CODE'}>
              <h1>{this.props.t('sign-up-code-sent')}</h1>
              <p>{this.props.t('sign-up-code-sent-sub')}</p>
            </If>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation('public')(Authentication)
