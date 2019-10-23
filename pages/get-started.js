import React from "react";
import Head from "../components/Head";
import HeaderMenu from "../components/HeaderMenu";
import { signUp, confirmSignUp, resendSignUp } from '../utils/auth'
import { withTranslation } from '../i18n'



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
        <div className="main main--sign-in">
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

              &--small {
                width: 600px;
              }
              &--sign-in {
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
            }
            @media (max-width: 992px) {
              .main {
                flex-direction: column;
                max-width: 500px;
                padding: 30px 20px;
                margin: 15px;

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

export default withTranslation('get-started')(Authentication)
