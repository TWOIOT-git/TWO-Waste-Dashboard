import React from "react";
import Head from "../components/Head";
import HeaderMenu from "../components/HeaderMenu";
import { signIn } from '../utils/auth'
import { withTranslation } from '../i18n'
import Link from "next/link"
import Router from 'next/router'
import Amplify, { Auth, Logger } from 'aws-amplify'
import Alert from "../components/Alert";

import './main.scss'

Amplify.Logger.LOG_LEVEL = 'DEBUG';
const logger = new Logger('IndexPage');

class Authentication extends React.Component {
  getInitialProps = async () => ({
    namespacesRequired: ['index'],
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
    }
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user => {
      logger.debug(user)
      Router.push('/sensors')
    }).catch(e => {
      logger.debug(e)
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({
      authState: 'loading'
    })

    let result = await signIn(this.state.email, this.state.password)

    if(result && result.error) {
      this.setState({
        error: result.error,
        authState: 'SIGN_IN'
      })
    }
  };


  render() {
    const { email, password } = this.state;
    const { onChange } = this;

    return (
      <section>
        <HeaderMenu />
        <Head title="Sign in | Lidbot" />
        <div className="main main--sign-in">
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

            <Alert error={this.state.error}></Alert>
            <form onSubmit={e => this.onSubmit(e)}>
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
              <If condition={this.state.authState === 'loading'}>
                <button type="submit" disabled="disabled">{this.props.t('signing-in')}</button>
              </If>
              <If condition={this.state.authState === 'SIGN_IN'}>
                <button type="submit">{this.props.t('sign-in')}</button>
              </If>
              <Link href={`/forgot?email=${email}`} as={`/forgot/${email}`}>
                <a className="link-label">{this.props.t('forgotten-password')}</a>
              </Link>
            </form>
          </div>
        </div>
        <style jsx>
          {`
          html,
            body {
              height: 100%;
            }
            @keyframes Enter {
              from {
                -webkit-transform: translateY(28px);
              }
              to {
                -webkit-transform: none;
              }
            }
            section {
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: white;
              padding-top: 70px;
            }
            .main {
              display: flex;
              background: #ffffff;
              box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
              animation: Enter 0.5s forwards;
              padding: 50px;

              width: 840px;
              padding: 50px 50px 0 13px;

              > div {
                &:nth-child(1) {
                  display: flex;
                  justify-content: space-between;
                  flex-direction: column;
                }

                &:nth-child(2) {
                  display: flex;
                  justify-content: space-between;
                  flex-direction: column;
                  padding-bottom: 50px;
                }
              }
              .logo {
                margin-left: 37px;
              }
            }
            @media (max-width: 992px) {
              .main {
                flex-direction: column;
                max-width: 500px;
                padding: 30px 20px;

                &--sign-in {
                  .logo {
                    margin: 0 0 35px 0;
                  }
                  .waste {
                    display: none;
                  }
                }
              }
            }
          `}
        </style>
      </section>
    );
  }
}

export default withTranslation('index')(Authentication)
