import React, { Component, useContext } from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SettingLayout from "../components/SettingLayout";
import { withTranslation } from '../i18n'
import { Auth, Logger, Storage } from 'aws-amplify';
import uuid from 'uuid/v1'
import ReactCodeInput from 'react-verification-code-input';
import Alert from "../components/Alert";
import { toast } from 'react-toastify'
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

import './main.scss'

const logger = new Logger('SettingsUserDetails');

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
      phone_number_verified: null,
      newPassword: '',
      successAuthCode: null,
    };

    this.readURL = this.readURL.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeImage = this.removeImage.bind(this);
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
      phone_number_verified: this.context.user.attributes['phone_number_verified'],
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

  async removeImage(event) {
    removeUserImage(this.state.imageS3Key)

    let state = await updateUserAttributes({
      picture: ''
    })

    this.setState({
      imagePreview: null
    })

    toast(this.props.t('image-removed'), {
      className: 'notification success'
    })
  }

  async readURL(event) {
    const file = event.target.files[0];

    let result = await Storage.put(`${uuid()}-${file.name}`, file, {
      contentType: file.type
    })

    if(result.key) {
      let previousImage = this.state.imageS3Key

      removeUserImage(previousImage)
      let state = await updateUserAttributes({
        picture: result.key
      })

      this.setState({
        successAuthCode: state.successAuthCode,
        imageS3Key: result.key,
        imagePreview: URL.createObjectURL(file)
      })

      toast(this.props.t('image-updated'), {
        className: 'notification success'
      })
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async onSendVerificationCode() {
    let state = await verifyCurrentUserAttribute('phone_number')
    this.setState(state)

    if(state.successAuthCode) {
      toast(this.props.t('verification-code-sent'), {
        className: 'notification success'
      })
    }
  }
  async verificationCodeEntered(code) {
    let state = await verifyCurrentUserAttributeSubmit('phone_number', code)
    this.setState(state)

    if(state.successAuthCode) {
      if(state.phone_number_verified) {
        toast(this.props.t('phone-verified'), {
          className: 'notification success'
        })
      }
    } else {
      toast(this.props.t("CodeMismatchException"), {
        className: 'notification error'
      })
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    let attributes = {}
    attributes.given_name = this.state.given_name
    attributes.family_name = this.state.family_name
    // attributes.phone_number = this.state.phone_number

    this.setState(updateUserAttributes(attributes))

    toast(this.props.t('settings-saved'), {
      className: 'notification success'
    })
  }
  async handleUpdatePassword(e) {
    e.preventDefault();

    let state = await changePassword(this.state.currentPassword, this.state.newPassword)
    this.setState(state)

    if(state.success) {
      toast(this.props.t('password-updated'), {
        className: 'notification success'
      })
    }
  }

  render() {
    return (
        <LayoutMenuNavegation>
        <Head title={'Lidbot - ' + this.props.t('user-details')}/>
        <SettingLayout>
          <form onSubmit={this.handleSubmit}>
            <div className="image--container">
                <If condition={this.state.imagePreview}>
                  <img src={this.state.imagePreview} />
                </If>
                <If condition={!this.state.imagePreview}>
                  <div className="placeholder"></div>
                </If>
                <input type="file" name="file" id="file" onChange={this.readURL} />
                <label htmlFor="file">{this.props.t('upload-image')}</label>
                <If condition={this.state.imagePreview}>
                  <span onClick={this.removeImage}>{this.props.t('remove')}</span>
                </If>
            </div>
            <div className="div-inputs">
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
                {/*<div className={`phone ${this.state.phone_number_verified ? 'verified' : 'not-verified'}`}>*/}
                {/*  <If condition={this.state.errorAuthCode}>*/}
                {/*    <div className="notification error">*/}
                {/*      {this.props.t(this.state.errorAuthCode)}*/}
                {/*    </div>*/}
                {/*  </If>*/}
                {/*  <label htmlFor="phone_number">*/}
                {/*    {this.props.t('phone')}*/}
                {/*    <If condition={this.state.phone_number}>*/}
                {/*      {this.state.phone_number_verified ? '' : <span className="not-verified"> (not verified!)</span>}*/}
                {/*    </If>*/}
                {/*    <input*/}
                {/*      name="phone_number"*/}
                {/*      id="phone_number"*/}
                {/*      inputMode="tel"*/}
                {/*      type="phone"*/}
                {/*      value={this.state.phone_number}*/}
                {/*      onChange={this.onChange}*/}
                {/*      placeholder={this.props.t('enter-phone')}*/}
                {/*    />*/}
                {/*  </label>*/}
                {/*  <If condition={this.state.phone_number}>*/}
                {/*    <If condition={!this.state.phone_number_verified}>*/}
                {/*    <If condition={this.state.successAuthCode !== 'CodeResentSuccessfully'}>*/}
                {/*      <span className="link" onClick={this.onSendVerificationCode}>{this.props.t('send-verification-code')}</span>*/}
                {/*    </If>*/}
                {/*    <If condition={this.state.successAuthCode === 'CodeResentSuccessfully'}>*/}
                {/*      <label className="verification-code">*/}
                {/*        <ReactCodeInput*/}
                {/*          title={this.props.t('verification-code')}*/}
                {/*          onComplete={e => this.verificationCodeEntered(e)}*/}
                {/*          type="text"*/}
                {/*        />*/}
                {/*      </label>*/}
                {/*      <span className="link" onClick={this.onSendVerificationCode}>{this.props.t('resend-verification-code')}</span>*/}
                {/*    </If>*/}
                {/*  </If>*/}
                {/*  </If>*/}
                {/*</div>*/}
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
                      disabled="disabled"
                    />
                  </label>
                </div>
                <div>
                  <button type="submit">{this.props.t('save-changes')}</button>
                </div>
              </div>
            </div>
          </form>
          <form onSubmit={this.handleUpdatePassword}>
            <div className="div-inputs">
              <Alert error={this.state.error}></Alert>
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
                      onChange={this.onChange}
                      placeholder={this.props.t('enter-current-password')}
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
                      onChange={this.onChange}
                      placeholder={this.props.t('enter-new-password')}
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
            .image--container {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              font-family: Roboto;
              margin-bottom: 50px;

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
                  cursor: pointer;
                  margin: 0 0 0 40px;
                  border: 1px solid #757575;
                  border-radius: 3px;
                  padding: 10px 20px;
                  color: #545454;
                  width: auto;

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


            .div-inputs {
              margin-top: 40px;
              margin-bottom: 40px;

              input:disabled {
                background: #dddddd;
                border-bottom: none;
                border-radius: 3px;
                padding-left: 10px;
                color: #666;
              }

              div.phone {
                .not-verified {
                  color: #da6464;
                }
                &.verified {
                }
                .link {
                  color: #da6464;
                  display: block;
                  margin-top: 15px;
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
