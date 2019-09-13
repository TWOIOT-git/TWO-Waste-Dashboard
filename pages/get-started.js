import React from "react";
import ReactCodeInput from 'react-verification-code-input';
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
    if(!this.state.email) {
      this.setState({
        errorAuthCode: "NoEmail",
      })
      return
    }

    if(!this.state.password) {
      this.setState({
        errorAuthCode: "NoPassword",
      })
      return
    }

    let state = await signUp(this.state.email, this.state.password)
    this.setState(state)
  }

  async onConfirmSignUp(e) {
    console.log(e)
    let state = await confirmSignUp(this.state.email, this.state.password, e)
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
        <If condition={this.state.errorAuthCode}>
          <div className="alert error">
            {this.props.t(this.state.errorAuthCode)}
          </div>
        </If>
        <If condition={this.state.successAuthCode}>
          <div className="alert info">
            {this.props.t(this.state.successAuthCode)}
          </div>
        </If>
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
                src="/static/images/sensor.png"
                alt="lidbot waste logo"
                className="waste"
              />
            </div>
          </div>
          <div>
            <h1>{this.props.t('title')}</h1>
            <p>{this.props.t('subtitle')}</p>

            <form onSubmit={e => this.onSignUp(e)}>
                <label htmlFor="email" className={disableEmailPassword ? 'disabled' : 'enabled'}>
                  {this.props.t('enter-email-password')}
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
              <If condition={
                authState === 'CONFIRM_CODE'
              }>
                <label className="verification-code">
                  <ReactCodeInput
                    title={this.props.t('verification-code')}
                    onComplete={e => this.onConfirmSignUp(e)}
                    type="text"
                  />
                </label>
                <a className='resend-verification' onClick={this.resendSignUp}>{this.props.t('Resend Verification Code')}</a>
              </If>
              <button type="submit">{this.props.t('sign-up-button')}</button>
              <div className="link-label">
                {this.props.t('sign-up-local-notice')}
                <a href="https://lidbot.com/terms-of-service" target="_blank">{this.props.t('terms')}</a>
                {this.props.t('and-our')}
                <a href="https://lidbot.com/privacy" target="_blank">{this.props.t('privacy')}</a>
              </div>
            </form>
          </div>
        </div>
        <style jsx>
          {`
            @keyframes Enter {
              from {
                -webkit-transform: translateY(28px);
              }
              to {
                -webkit-transform: none;
              }
            }
            a {
              color: #00b284;
            }
            .welcome-image {
              img {
                max-width:100%;
                max-height:100%;
              }
            }
            .verification-code {
              margin-bottom: 5px;
            }
            .resend-verification {
              font-size: 12px;
              color: #757575;
              padding: 5px 0;
              cursor: pointer;
            }
            .link-label {
              color: #757575;
              text-decoration: none;
              font-size: 12px;
              letter-spacing: 0.02em;
              margin-bottom: 50px;
              line-height: 1.5;
            }

            section {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              background-color: white;

              @media (max-width: 876px) {
                display: block;
              }

              > div {
                position: absolute;
                width: 840px;
                display: flex;
                padding-top: 50px;
                margin: 0;
                top: 150px;

                background: #ffffff;
                box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
                animation: Enter 0.5s forwards;
                
                &.main {
                  margin-bottom: 5%;
                }

                @media (max-width: 876px) {
                  flex-direction: column;
                  width: 100%;
                  padding: 5%;
                  height: unset;
                  box-shadow: none;
                  animation: none;
                }
                
                &.alert {
                  top: 85px;
                  border-radius: 4px;
                  padding: 15px;
                  font-size: 14px;
                  font-weight: 400;
                
                  &.error {
                    border: 1px solid #d64242;
                    color: #d64242;
                  }
                  &.info {
                    border: 1px solid #75e900;
                    color: #75e900;
                  }
                }

                > div {
                  width: 50%;

                  @media (max-width: 876px) {
                    width: 100%;
                  }

                  &:nth-child(1) {
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: column;

                    .logo {
                      margin-left: 37px;

                      @media (max-width: 876px) {
                        margin-left: 0;
                        margin-bottom: 10vh;
                      }
                    }

                    .waste {
                      @media (max-width: 876px) {
                        display: none;
                      }
                    }
                  }

                  &:nth-child(2) {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    padding-right: 50px;

                    @media (max-width: 876px) {
                      padding-right: 0;
                    }

                    h1 {
                      font-family: Roboto;
                      font-style: normal;
                      font-weight: 900;
                      font-size: 32px;
                      line-height: normal;

                      color: #000000;
                    }

                    p {
                      font-family: Roboto;
                      font-style: normal;
                      font-weight: 300;
                      font-size: 18px;
                      line-height: 25px;

                      color: #757575;
                    }

                    form {
                      width: 100%;

                      label {
                        width: 100%;
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 12px;
                        line-height: normal;
                        margin-top: 20px;
                        display: block;
                        color: #00b284;
                        
                        &.disabled {
                          color: #757575;
                        }
                      }
                      input:disabled,
                      input[disabled] {
                        background-color: #fafafa;
                        color: #757575;
                      }

                      input {
                        width: 100%;
                        border: none;
                        padding: 20px 20px 20px 0;
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 16px;
                        line-height: normal;
                        border-bottom: 1px solid #00b284;
                        height: 40px;
                        color: #000000;
                        outline: none;
                        transition: 1s all ease;

                        &:focus {
                          border-bottom: 1px solid #0af1b5;
                        }

                        &::placeholder {
                          font-family: Roboto;
                          font-style: normal;
                          font-weight: normal;
                          font-size: 12px;
                          line-height: normal;

                          color: #000000;
                        }
                      }

                      button {
                        background: #00b284;
                        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
                        border: none;
                        color: white;
                        width: 100%;
                        height: 50px;
                        margin-top: 30px;
                        margin-bottom: 30px;
                        cursor: pointer;
                        transition: 0.2s all ease;
                        outline: none;

                        &:active,
                        &:hover,
                        &:focus {
                          background-color: #0af1b5;
                        }

                        @media (max-width: 876px) {
                          margin-bottom: 0;
                        }
                      }
                    }
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

export default withTranslation('public')(Authentication)
