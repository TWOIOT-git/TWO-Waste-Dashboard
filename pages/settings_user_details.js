import React, { Component, useContext } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import breakpoints from "../utils/breakpoints";
import SettingLayout from "../components/SettingLayout";
import { withTranslation } from '../i18n'
import { Logger, Storage } from 'aws-amplify';
import uuid from 'uuid/v1'
import ReactCodeInput from 'react-verification-code-input';

const logger = new Logger('SettingsUserDetails');

import {
  updateUserAttributes,
  withAuthSync,
  ClientContext,
  getUserImage,
  removeUserImage,
  verifyCurrentUserAttribute,
  verifyCurrentUserAttributeSubmit,
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
      imagePreview: null,
      imageS3Key: null,
      currentPassword: '',
      email_verified: null,
      phone_number_verified: null,
      newPassword: '',
      client_name: '',
      errorAuthCode: null,
      successAuthCode: null,
    };

    this.readURL = this.readURL.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    this.onSendVerificationCode = this.onSendVerificationCode.bind(this);
    this.verificationCodeEntered = this.verificationCodeEntered.bind(this);
  }

  componentDidMount() {
    let imageS3Key = null
    if(this.context.user.attributes['picture']) {
      imageS3Key = this.context.user.attributes['picture']
    }

    this.setState({
      given_name: (this.context.user.attributes['given_name']) ? this.context.user.attributes['given_name'] : '',
      family_name: (this.context.user.attributes['family_name']) ? this.context.user.attributes['family_name'] : '',
      phone_number: (this.context.user.attributes['phone_number']) ? this.context.user.attributes['phone_number'] : '',
      imageS3Key: imageS3Key,
      email: this.context.user.attributes['email'],
      client_id: this.context.user.attributes['custom:client_id'],
      phone_number_verified: this.context.user.attributes['phone_number_verified'],
      client_name: (this.context.user.attributes['custom:client_name']) ? this.context.user.attributes['custom:client_name'] : '',
    })

    getUserImage(imageS3Key).
    then((key) => {
      this.setState({
        imagePreview: key
      })
    }).
    catch((err) => {
      })
  }

  removeImage = event => {
    removeUserImage(this.state.imageS3Key)
    updateUserAttributes({
      picture: ''
    })

    this.setState({
      imagePreview: null
    })
  }

  readURL = event => {
    const file = event.target.files[0];

    this.setState({
      imagePreview: URL.createObjectURL(file)
    })

    let imageS3Key = this.state.imageS3Key

    Storage.put(`${uuid()}-${file.name}`, file, {
      level: 'private',
      contentType: file.type
    })
      .then (result => {

        console.log('removing: ', imageS3Key)
        removeUserImage(imageS3Key) // remove previos

        updateUserAttributes({
          picture: result.key
        })
        this.setState({
          imageS3Key: result.key
        })
      })
      .catch(err => {
        logger.error(err)
      });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async onSendVerificationCode() {
    let state = await verifyCurrentUserAttribute('phone_number')
    this.setState(state)
  }
  async verificationCodeEntered(code) {
    let state = await verifyCurrentUserAttributeSubmit('phone_number', code)
    this.setState(state)
  }

  handleSubmit(e) {
    e.preventDefault();

    let attributes = {}
    attributes.given_name = this.state.given_name
    attributes.family_name = this.state.family_name
    attributes.phone_number = this.state.phone_number
    attributes['custom:client_name'] = this.state.client_name

    updateUserAttributes(attributes)
  }
  handleUpdatePassword(e) {
    e.preventDefault();

    changePassword(this.state.currentPassword, this.state.newPassword)
  }

  render() {
    return (
      <LayoutMenuNavegation>
        <Head title={'Lidbot - ' + this.props.t('user-details')}/>
        <SettingLayout>
          <form onSubmit={this.handleSubmit}>
            <div className="--div-image">
              <div>
                <If condition={this.state.imagePreview}>
                  <img src={this.state.imagePreview} />
                </If>
                <If condition={!this.state.imagePreview}>
                  <div className="placeholder"></div>
                </If>
                <input type="file" name="file" id="file" onChange={this.readURL} />
                <label htmlFor="file">Upload an image</label>
                <If condition={this.state.imagePreview}>
                  <span onClick={this.removeImage}>Remove</span>
                </If>
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
                      value={this.state.given_name}
                      onChange={this.onChange}
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
                      value={this.state.family_name}
                      onChange={this.onChange}
                      placeholder={this.props.t('enter-last-name')}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="email">
                    {this.props.t('email')}
                    <input
                      name="email"
                      id="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      placeholder={this.props.t('enter-email')}
                    />
                  </label>
                </div>
                <div className={`phone ${this.state.phone_number_verified ? 'verified' : 'not-verified'}`}>
                  <label htmlFor="phone_number">
                    {this.props.t('phone')}
                    <input
                      name="phone_number"
                      id="phone_number"
                      inputMode="tel"
                      type="phone"
                      value={this.state.phone_number}
                      onChange={this.onChange}
                      placeholder={this.props.t('enter-phone')}
                    />
                  </label>
                  <If condition={!this.state.phone_number_verified}>
                    <If condition={this.state.successAuthCode !== 'CodeResentSuccessfully'}>
                      <span onClick={this.onSendVerificationCode}>{this.props.t('send-verification-code')}</span>
                    </If>
                    <If condition={this.state.successAuthCode === 'CodeResentSuccessfully'}>
                      <label className="verification-code">
                        <ReactCodeInput
                          title={this.props.t('verification-code')}
                          onComplete={e => this.verificationCodeEntered(e)}
                          type="text"
                        />
                      </label>
                      <span onClick={this.onSendVerificationCode}>{this.props.t('resend-verification-code')}</span>
                    </If>
                  </If>
                </div>
                <div>
                  <label htmlFor="client_name">
                    {this.props.t('company-name')}
                    <input
                      name="client_name"
                      id="client_name"
                      value={this.state.client_name}
                      onChange={this.onChange}
                      placeholder={this.props.t('enter-company-name')}
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
        </SettingLayout>
        <style jsx>
          {`
            .Collapsible {
              background: #00b284;
              width: 100%;
              text-align: left;
              padding: 10px;
              color: #fff;
              font-weight: 400;
              text-decoration: none;
              cursor: pointer;
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
                margin-bottom: 40px;
                
                div.phone {
                  &.not-verified {
                  }
                  &.verified {
                  }
                  span {
                    display: block;
                    margin-top: 15px;
                    color: #da6464;
                    cursor: pointer;
                  }
                }
                

                > div {
                  display: grid;
                  grid-gap: 20px;
                  grid-template-columns: 
                    [container-start] minmax(0, 30em) 
                    [container-end] minmax(1em, 1fr) 
                    [viewport-end];
        
                  > div {
                    grid-column: container;
                    padding: 20px;
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
              }

              .--div-image {
                font-family: Roboto;
                margin-bottom: 40px;
                > div {
                  display: flex;
                  align-items: center;
                  > img {
                    border: 1px solid #00b284;
                    border-radius: 50%;
                    width: 164px;
                    height: 164px;
                  }
                  > .placeholder {
                    border: 1px solid #00b284;
                    border-radius: 50%;
                    width: 164px;
                    height: 164px;
                    background: #f6f6f6;
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
                    font-size: 16px;
                    font-weight: 400;
                    display: inline-block;
                    cursor: pointer;
                    margin-left: 40px;
                    border: 1px solid #757575;
                    border-radius: 3px;
                    padding: 10px 20px;
                    
                    &:hover {
                      border: 1px solid #00b284;
                      color: #00b284;
                    }
                  }
                  > span {
                    margin-left: 20px;
                    color: #00b284;
                    font-size: 14px;
                    
                    &:hover {
                      text-decoration: underline;
                    }
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
