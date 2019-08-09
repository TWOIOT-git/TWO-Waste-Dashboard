import React, { Component, useContext } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import breakpoints from "../utils/breakpoints";
import SettingLayout from "../components/SettingLayout";
import { withAuthSync, ClientContext } from '../utils/auth'

class SettingsUserDetails extends Component {
  static contextType = ClientContext;

  constructor(props) {
    super(props);

    this.state = {
      given_name: null,
      family_name: null,
      email: null,
      phone_number: null,
      locale: null,
      imagePreview: null,
    };
  }

  componentDidMount() {
    this.setState({
      given_name: this.context.given_name,
      family_name: this.context.family_name,
      phone_number: this.context.phone_number,
      email: this.context.email,
      locale: this.context.locale,
      client_id: this.context.client_id,
      imagePreview: this.context.picture
    })
  }

  readURL = event => {
    this.setState({
      imagePreview: URL.createObjectURL(event.target.files[0])
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.valueu
    });
  };

  render() {
    const {
      state: { imagePreview, family_name, given_name, email, phone_number, password, locale, client_id },
      readURL,
      onChange
    } = this;
    return (
      <LayoutMenuNavegation>
        <Head title="lidbot - Settings User" />
        <SettingLayout>
          <form>
            <div className="--div-image">
              <div>
                <img src={imagePreview} alt="preview" />
                <input type="file" name="file" id="file" onChange={readURL} />
                <label htmlFor="file">EDIT</label>
              </div>
              <div className="client-info">
                Client Id
                <div>{client_id}</div>
              </div>
            </div>
            <div className="--div-inputs">
              <div>
                <div>
                  <label htmlFor="firstname">
                    First Name
                    <input
                      name="firstname"
                      id="firstname"
                      value={given_name}
                      onChange={e => onChange(e)}
                      placeholder="Enter your First Name"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="lastname">
                    Last Name
                    <input
                      name="lastname"
                      id="lastname"
                      value={family_name}
                      onChange={e => onChange(e)}
                      placeholder="Enter your Last Name"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="email">
                    E-mail
                    <input
                      name="email"
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => onChange(e)}
                      placeholder="Enter your Email"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="phone">
                    Phone
                    <input
                      name="phone"
                      id="phone"
                      inputMode="tel"
                      type="phone"
                      value={phone_number}
                      onChange={e => onChange(e)}
                      placeholder="Enter your Phone"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="password">
                    Password
                    <input
                      name="password"
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => onChange(e)}
                      placeholder="Enter your Password"
                    />
                  </label>
                </div>
                  <label htmlFor="locale">
                    Locale
                    <input
                      name="locale"
                      id="locale"
                      value={locale}
                      onChange={e => onChange(e)}
                      placeholder="Locale"
                    />
                  </label>
                <div />
                <div>
                  <button type="submit">SAVE CHANGES</button>
                </div>
              </div>
            </div>
          </form>
        </SettingLayout>
        <style jsx>
          {`
            form {
            .client-info {
              color: #555;
              margin-top: 30px;
            }
              .--div-inputs {
                margin-top: 40px;

                > div {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  grid-template-rows: 1fr;
                  grid-gap: 24px;

                  @media (max-width: ${breakpoints.phone}) {
                    grid-template-columns: 1fr;
                    grid-gap: 0;
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
                  cursor: pointer;
                  transition: 0.2s all ease;
                  outline: none;
                  margin-top: 68px;

                  &:active,
                  &:hover,
                  &:focus {
                    background-color: #0af1b5;
                  }

                  @media (max-width: ${breakpoints.phone}) {
                    margin-top: 40px;
                    font-size: 1.25rem;
                  }
                }

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
              }

              .--div-image {
                > div {
                  > img {
                    border: 2px solid #00b284;
                    border-radius: 50%;
                    width: 164px;
                    height: 164px;
                  }

                  > input {
                    width: 0.1px;
                    height: 0.1px;
                    opacity: 0;
                    overflow: hidden;
                    position: absolute;
                    z-index: -1;

                    &:focus + label {
                      outline: 2px solid #05654c;
                    }
                  }

                  > label {
                    font-size: 1.25em;
                    font-weight: 700;
                    color: white;
                    display: inline-block;
                    cursor: pointer;
                    margin-left: 40px;
                    background: #00b284;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
                    padding: 10px 20px;
                  }
                }
              }
            }
          `}
        </style>
      </LayoutMenuNavegation>
    );
  }
}

export default withAuthSync(SettingsUserDetails)
