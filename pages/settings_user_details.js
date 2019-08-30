import React, { Component, useContext } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import breakpoints from "../utils/breakpoints";
import SettingLayout from "../components/SettingLayout";
import { withTranslation } from '../i18n'
import Collapsible from 'react-collapsible';

import {
  updateUserAttributes,
  withAuthSync,
  ClientContext,
  changePassword
} from '../utils/auth'

class SettingsUserDetails extends Component {
  static contextType = ClientContext;

  getInitialProps = async () => ({
    namespacesRequired: ['settings'],
  })

  constructor(props) {
    super(props);

    this.state = {
      given_name: '',
      family_name: '',
      email: '',
      phone_number: '',
      imagePreview: '',
      currentPassword: '',
      newPassword: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
  }

  componentDidMount() {
    this.setState({
      given_name: this.context.user.attributes['given_name'],
      family_name: this.context.user.attributes['family_name'],
      phone_number: this.context.user.attributes['phone_number'],
      email: this.context.user.attributes['email'],
      client_id: this.context.user.attributes['custom:client_id'],
      imagePreview: this.context.user.attributes['picture']
    })
  }

  readURL = event => {
    this.setState({
      imagePreview: URL.createObjectURL(event.target.files[0])
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    updateUserAttributes({
      given_name: this.state.given_name,
      family_name: this.state.family_name,
      phone_number: this.state.phone_number,
    })
  }
  handleUpdatePassword(e) {
    e.preventDefault();

    changePassword(this.state.currentPassword, this.state.newPassword)
  }

  render() {
    const {
      state: { imagePreview, family_name, given_name, email, phone_number, client_id },
      readURL,
      onChange
    } = this;
    return (
      <LayoutMenuNavegation>
        <Head title={'lidbot - ' + this.props.t('user-details')}/>
        <SettingLayout>
          <form onSubmit={this.handleSubmit}>
            <div className="--div-image">
              <div>
                <img src={imagePreview} alt="preview" />
                <input type="file" name="file" id="file" onChange={readURL} />
                <label htmlFor="file">EDIT</label>
              </div>
              <div className="client-info">
                <div>{client_id}</div>
                <div>{email}</div>
              </div>
            </div>
            <div className="--div-inputs">
              <div>
                <div>
                  <label htmlFor="given_name">
                    {this.props.t('first-name')}
                    <input
                      name="given_name"
                      id="given_name"
                      value={given_name}
                      onChange={e => onChange(e)}
                      placeholder={this.props.t('enter-first-name')}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="family_name">
                    {this.props.t('last-name')}
                    <input
                      name="family_name"
                      id="family_name"
                      value={family_name}
                      onChange={e => onChange(e)}
                      placeholder={this.props.t('enter-last-name')}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="phone_number">
                    {this.props.t('phone')}
                    <input
                      name="phone_number"
                      id="phone_number"
                      inputMode="tel"
                      type="phone"
                      value={phone_number}
                      onChange={e => onChange(e)}
                      placeholder={this.props.t('enter-phone')}
                    />
                  </label>
                </div>
                <div />
                <div>
                  <button type="submit">{this.props.t('save-changes')}</button>
                </div>
              </div>
            </div>
          </form>
          {/*<Collapsible*/}
          {/*  trigger={this.props.t('section-password')}*/}
          {/*>*/}
          <form onSubmit={this.handleUpdatePassword}>
            <div className="--div-inputs">
              <div>
                <div>
                <div>
                  <label htmlFor="currentPassword">
                    {this.props.t('current-password')}
                    <input
                      name="currentPassword"
                      id="currentPassword"
                      type="password"
                      value={this.state.currentPassword}
                      onChange={e => onChange(e)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="newPassword">
                    {this.props.t('new-password')}
                    <input
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      value={this.state.newPassword}
                      onChange={e => onChange(e)}
                    />
                  </label>
                </div>
              </div>
              </div>
              <div>
                <button type="submit">{this.props.t('save-password')}</button>
              </div>
            </div>
          </form>
          {/*</Collapsible>*/}
        </SettingLayout>
        <style jsx>
          {`
          
            .Collapsible {
              border: solid 1px #f2f2f2;
            }
            .Collapsible__trigger {
              border: solid 1px #f2f2f2;
              padding: 10px;
            }
            
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
                  width: 200px;
                  height: 40px;
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

export default withTranslation('settings')(withAuthSync(SettingsUserDetails))
