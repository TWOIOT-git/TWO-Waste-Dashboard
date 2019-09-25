import React from "react";
import Head from "../components/Head";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { forgotPasswordSubmit } from '../utils/auth'
import { i18n, withTranslation } from '../i18n'
import Link from "next/link"

import '../src/sass/main.scss'
import '../src/sass/main-public.scss'

class ResetPassword extends React.Component {
  static async getInitialProps ({ query: { email, code, language } }) {
    return { email: email, code: code, language: language }
  }

  constructor(props) {
    super(props)

    i18n.changeLanguage(props.language)

    this.state = {
      code: props.code,
      email: props.email,
      language: props.language,
      password: '',
      errorAuthCode: null,
      successAuthCode: null,
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async onSubmit(e) {
    e.preventDefault();

    let state = await forgotPasswordSubmit(this.state.email, this.state.code, this.state.password)

    this.setState(state)
  };

  render() {
    const { onChange } = this;

    return (
      <section>
        <HeaderMenu />
        <Head title={`${this.props.t('password-reset')} | Lidbot`} />
        <div className="main">
          <div className="content">
            <If condition={this.state.successAuthCode !== 'PasswordChangedSuccessfully'}>
              <h1>{this.props.t('password-reset')}</h1>
              <p>{this.props.t('new-password-prompt')}</p>
              <If condition={this.state.errorAuthCode}>
                <div className="alert error">
                  {this.props.t(this.state.errorAuthCode)}
                </div>
              </If>
              <form onSubmit={e => this.onSubmit(e)}>
                <label htmlFor="password">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    autoFocus
                    size={40}
                    value={this.state.password}
                    onChange={e => onChange(e)}
                    placeholder={this.props.t('password')}
                  />
                </label>
              <button type="submit">{this.props.t('change-password')}</button>
            </form>
            </If>
            <If condition={this.state.successAuthCode === 'PasswordChangedSuccessfully'}>
              <h1 className="success">{this.props.t('h1')}</h1>
              <p>{this.props.t('p')}
              <Link href='/'>
                <a className="link-label">{this.props.t('sign-in')}.</a>
              </Link>
              </p>
            </If>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation('reset-password')(ResetPassword)
