import React from "react";
import Router from 'next/router'
import Head from "../components/Head";

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.valueu
    });
  };

  onSubmit = e => {
    e.preventDefault();

    Router.push('/analytics')
  };

  render() {
    const { email, password } = this.state;
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
            <form onSubmit={e => this.onSubmit(e)}>
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
                  placeholder="Write your password"
                />
              </label>
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
