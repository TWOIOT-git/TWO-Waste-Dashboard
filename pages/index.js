import React from "react";
import Router from 'next/router'
import Head from "../components/Head";

import Amplify, { Auth } from 'aws-amplify';
let awsconfig = {
  aws_project_region: process.env.AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {}
}
Amplify.configure(awsconfig);

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      newPassword: "",
      passwordRepeat: "",
      authState: 'signIn',
      authData: null,
      authError: null,
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
          this.setState({authError: "Passwords are not the same."});
        } else {
          console.log(this.state.user);
          console.log('Calling completeNewPassword');
          const loggedUser = await Auth.completeNewPassword(
            this.state.user,
            this.state.newPassword,
          );
          console.log(loggedUser);
          Router.push('/analytics');
        }
      } else {
        const user = await Auth.signIn(this.state.email, this.state.password)

        console.log('sign in success!')
        console.log(user)

        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.setState({user: user, authState: user.challengeName, authError: 'Please change your password.'})
        } else {
          Router.push('/analytics')
        }
      }
    } catch (err) {
      console.log('error signing up..', err)
      this.setState({authError: err.message})
    }
  }

  render() {
    const { email, password, newPassword, passwordRepeat, authError, authState } = this.state;
    const { onChange } = this;

    return (
      <section>
        <Head title="lidbot - Login" />
        <div>
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
            <h1>WASTE ANALYTICS PLATFORM</h1>
            <p>Welcome back! Login to continue your smart waste management.</p>

            <div className="alert error">
              {authError}
            </div>

            <form onSubmit={e => this.onSubmit(e)}>
              <If condition={authState === 'signIn'}>
                <label htmlFor="email">
                  Email
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => onChange(e)}
                    placeholder="Enter your email"
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => onChange(e)}
                    placeholder="Password"
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
              <button type="submit">Login</button>
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
            .alert {
              border-radius: 4px;
              padding: 10px;
              margin-bottom: 20px;
              font-size: 12px;
              text-align: center;
              font-weight: 100;
              &:empty {
                display: none;
              }
            }
            .error {
              background: #d64242;
              color: #fff;
            }

            section {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background-color: white;

              @media (max-width: 876px) {
                display: block;
              }

              > div {
                width: 840px;
                height: 560px;
                display: flex;
                padding-top: 50px;

                background: #ffffff;
                box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
                animation: Enter 0.5s forwards;

                @media (max-width: 876px) {
                  flex-direction: column;
                  width: 100%;
                  padding: 5%;
                  height: unset;
                  box-shadow: none;
                  animation: none;
                }

                > div {
                  width: 50%;

                  @media (max-width: 876px) {
                    width: 100%;
                  }

                  &:nth-child(1) {
                    display: flex;
                    justify-content: space-between;
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
                      }

                      input {
                        width: 100%;
                        border: none;
                        padding: 20px 20px 20px 0;
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 12px;
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
                        text-transform: uppercase;
                        width: 100%;
                        height: 50px;
                        margin-top: 30px;
                        margin-bottom: 60px;
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
