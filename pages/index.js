import React from "react";
import Head from "../components/Head";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { signIn, completeNewPassword } from '../utils/auth'
import { withTranslation } from '../i18n'
import Link from "next/link"

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
      newPassword: "",
      passwordRepeat: "",
      authState: 'SIGN_IN',
      successAuthCode: null,
      errorAuthCode: null,
      user: null,
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.signIn()
  };

  async signIn() {
    try {
      if(this.state.authState === 'NEW_PASSWORD_REQUIRED') {
        if(this.state.newPassword !== this.state.passwordRepeat) {
          console.log('PASSWORD_DO_NOT_MATCH')
          this.setState({errorAuthCode: "Passwords are not the same."});
        } else {
          console.log(this.state.user);
          console.log('Calling completeNewPassword');
          completeNewPassword(
            this.state.user,
            this.state.newPassword,
          );
        }
      } else {
        let state = await signIn(this.state.email, this.state.password)
        this.setState(state)
      }
    } catch (err) {
      console.log('error signing up..', err)
      this.setState({errorAuthCode: err.message})
    }
  }

  render() {
    const { email, password, newPassword, passwordRepeat, errorAuthCode, authState } = this.state;
    const { onChange } = this;

    return (
      <section>
        <HeaderMenu />
        <Head title="Sign in | Lidbot" />
        <div className="main">
          <div>
            <div>
              <img
                src="/static/icons/logo.png"
                alt="lidbot logo"
                className="logo"
              />
            </div>
            <div>
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

            <form onSubmit={e => this.onSubmit(e)}>
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
              <If condition={authState !== 'NEW_PASSWORD_REQUIRED'}>
                <label htmlFor="email">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => onChange(e)}
                    placeholder={this.props.t('email-placeholder')}
                  />
                </label>
                <label htmlFor="password">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => onChange(e)}
                    placeholder={this.props.t('password-placeholder')}
                  />
                </label>
              </If>
              <If condition={authState === 'NEW_PASSWORD_REQUIRED'}>
                <label htmlFor="newPassword">
                  Password
                  <input
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={e => onChange(e)}
                    placeholder="New Password"
                  />
                </label>
                <label htmlFor="passwordRepeat">
                  Repeat Password
                  <input
                    name="passwordRepeat"
                    id="passwordRepeat"
                    type="password"
                    value={passwordRepeat}
                    onChange={e => onChange(e)}
                    placeholder="Repeat Password"
                  />
                </label>
              </If>
              <button type="submit">{this.props.t('sign-in')}</button>
              <Link href={`/forgot?email=${email}`} as={`/forgot/${email}`}>
                <a className="link-label">{this.props.t('forgotten-password')}</a>
              </Link>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation('public')(Authentication)
