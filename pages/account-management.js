import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SwitchItem from "../components/SwitchItem";
import SettingLayout from "../components/SettingLayout";
import { updateUserAttributes, withAuthSync, reloadUserContext, ClientContext } from '../utils/auth'
import { Logger, Auth, ServiceWorker } from 'aws-amplify';
import { withTranslation } from '../i18n'
import { toast } from 'react-toastify'
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import fetch from "isomorphic-unfetch";


import './main.scss'

const logger = new Logger('SettingsNotifications');

const MySlider = withStyles({
  root: {
    color: '#00bf8d',
    marginBottom: '70px',
    height: 8,
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  mark: {
    backgroundColor: '#00bf8d',
    height: 20,
    width: 1,
    marginTop: -7,
  },
})(Slider);

const deltaMarks = [
  {
    value: -100,
    label: '-100%',
  },
  {
    value: -80,
  },
  {
    value: -60,
  },
  {
    value: -40,
  },
  {
    value: -20,
  },
  {
    value: 0,
    label: '0%',
  },
  {
    value: 20,
  },
  {
    value: 40,
  },
  {
    value: 60,
  },
  {
    value: 80,
  },
  {
    value: 100,
    label: '100%',
  },
];

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 20,
  },
  {
    value: 40,
  },
  {
    value: 60,
  },
  {
    value: 80,
  },
  {
    value: 100,
    label: '100%',
  },
];


class SettingsNotifications extends React.Component {
  static contextType = ClientContext;

  static async getInitialProps({req}) {
    return {
      namespacesRequired: ['settings'],
    }
  }

  constructor(props) {
    super(props);

    let pushNotifications = {}

    if (Notification.permission === 'denied') {
      pushNotifications.description = this.props.t('push-notifications-blocked');
      pushNotifications.disabled = true;
      pushNotifications.active = false;
    } else {
      pushNotifications.description = this.props.t('push-notifications-sub');
      pushNotifications.disabled = false;
      pushNotifications.active = false;
    }

    this.state = {
      pushNotifications: pushNotifications,
      emailNotifications: false,
      mobileNotifications: false,
      binFillLevelNotifications: false,
      deltaNotifications: false,
      minThreshold: 0,
      maxThreshold: 0,
      delta: 0,
      customer: null
    }
  }

  async componentDidMount() {
    let pushNotifications = this.context.user.attributes['custom:push_notifications']
    let emailNotifications = this.context.user.attributes['custom:email_notifications']
    let mobileNotifications = this.context.user.attributes['custom:mobile_notifications']
    let binFillLevelNotifications = this.context.user.attributes['custom:bin_fill_level']
    let deltaNotifications = this.context.user.attributes['custom:delta_notifications']

    const user = await Auth.currentAuthenticatedUser()
    const url = process.env.DEVICE_API + "customers/" + user.attributes['custom:client_id']
    const response = await fetch(url);
    const customer = await response.json();

    console.log('customer: ', customer)

    this.setState(prevState => ({
      pushNotifications: {
        ...prevState.pushNotifications,
        active: (pushNotifications !== undefined) ? pushNotifications : false
      },
      emailNotifications: (emailNotifications !== undefined) ? emailNotifications : false,
      mobileNotifications: (mobileNotifications !== undefined) ? mobileNotifications : false,
      binFillLevelNotifications: (binFillLevelNotifications !== undefined) ? binFillLevelNotifications : false,
      deltaNotifications: (deltaNotifications !== undefined) ? deltaNotifications : false,
      maxThreshold: customer.max_threshold,
      minThreshold: customer.min_threshold,
      delta: customer.delta,
      customer: customer
    }))
  }

  async handleClick(newState) {
    if(newState.pushNotifications) {

      if(newState.pushNotifications.active === true) {
        this.subscribe();
      } else {
        this.unsubscribeUser();
      }

    } else {
      let attributes = {
        'custom:email_notifications': (newState.emailNotifications !== undefined) ? newState.emailNotifications.toString() : this.state.emailNotifications.toString(),
        'custom:mobile_notifications': (newState.mobileNotifications !== undefined) ? newState.mobileNotifications.toString() : this.state.mobileNotifications.toString(),
        'custom:bin_fill_level': (newState.binFillLevelNotifications !== undefined) ? newState.binFillLevelNotifications.toString() : this.state.binFillLevelNotifications.toString(),
        'custom:delta_notifications': (newState.deltaNotifications !== undefined) ? newState.deltaNotifications.toString() : this.state.deltaNotifications.toString(),
      }

      const state = await updateUserAttributes(attributes)

      this.setState(prevState => ({
        emailNotifications: (newState.emailNotifications !== undefined) ? newState.emailNotifications : this.state.emailNotifications,
        mobileNotifications: (newState.mobileNotifications !== undefined) ? newState.mobileNotifications : this.state.mobileNotifications,
        binFillLevelNotifications: (newState.binFillLevelNotifications !== undefined) ? newState.binFillLevelNotifications : this.state.binFillLevelNotifications,
        deltaNotifications: (newState.deltaNotifications !== undefined) ? newState.deltaNotifications : this.state.deltaNotifications,
      }))

      toast(this.props.t('settings-saved'), {
        className: 'notification success'
      })
    }
  }

  handleDeltaChange = (event, newValue) => {
    this.setState({
      delta: newValue,
    })
  }
  onDeltaCommitted = async (event, newValue) => {
    logger.debug(event)

    this.setState({
      delta: newValue,
    })


    const user = await Auth.currentAuthenticatedUser()
    const response = await fetch(`${process.env.DEVICE_API}customers/${user.attributes['custom:client_id']}`, {
      method: 'POST',
      body: JSON.stringify({
        delta: newValue,
      })
    })

    if (response.ok) {
      toast(this.props.t('settings-saved'), {
        className: 'notification success'
      })
    } else {
      toast(this.props.t('settings-saved-error'), {
        className: 'notification error'
      })
    }
  }


  handleThresholdChange = (event, newValue) => {
    this.setState({
      minThreshold: newValue[0],
      maxThreshold: newValue[1]
    })
  }
  onChangeCommitted = async (event, newValue) => {
    logger.debug(event)

    this.setState({
      minThreshold: newValue[0],
      maxThreshold: newValue[1]
    })


    const user = await Auth.currentAuthenticatedUser()
    const response = await fetch(`${process.env.DEVICE_API}customers/${user.attributes['custom:client_id']}`, {
      method: 'POST',
      body: JSON.stringify({
        min_threshold: newValue[0],
        max_threshold: newValue[1]
      })
    })

    if (response.ok) {
      toast(this.props.t('settings-saved'), {
        className: 'notification success'
      })
    } else {
      toast(this.props.t('settings-saved-error'), {
        className: 'notification error'
      })
    }
  }

  render() {
    return (
      <LayoutMenuNavegation>
        <Head title={'Lidbot - ' + this.props.t('notifications')}/>
        <SettingLayout>
          <div className="main">
            <SwitchItem
              title={this.props.t('bin-fill-level-notifications')}
              description={this.props.t('bin-fill-level-notifications-sub')}
              active={this.state.binFillLevelNotifications}
              onClick={(active) => this.handleClick({ binFillLevelNotifications: active })}
            />
            <SwitchItem
              title={this.props.t('delta-notifications')}
              description={this.props.t('delta-notifications-sub')}
              active={this.state.deltaNotifications}
              onClick={(active) => this.handleClick({ deltaNotifications: active })}
            />
            <div className="slider">
              <div className="slider-header">
                <span className="settings-header">Bin fill level notifications settings</span>
                <span className="settings-sub">When the fill level is equal or above <strong>{this.state.maxThreshold}%</strong> you will get notified.</span>
                <If condition={this.state.minThreshold > 0}>
                  <span className="settings-sub">When the fill level is equal or below <strong>{this.state.minThreshold}%</strong> you will get notified.</span>
                </If>
                <If condition={this.state.delta !== 0}>
                  <span className="settings-sub">When the fill level changes by <strong>{this.state.delta}%</strong> you will get notified.</span>
                </If>
              </div>
              <span className="slider-label">Bin fill level settings:</span>
              <MySlider
                value={[this.state.minThreshold, this.state.maxThreshold]}
                disabled={!this.state.binFillLevelNotifications}
                valueLabelDisplay="on"
                onChange={this.handleThresholdChange}
                onChangeCommitted={this.onChangeCommitted}
                marks={marks}
              />
              <span className="slider-label">Bin fill level change rate settings:</span>
              <MySlider
                min={-100}
                value={this.state.delta}
                disabled={!this.state.deltaNotifications}
                valueLabelDisplay="on"
                onChange={this.handleDeltaChange}
                onChangeCommitted={this.onDeltaCommitted}
                marks={deltaMarks}
              />
            </div>
          </div>
        </SettingLayout>
        <style jsx>
          {`
            .main {
            }
            .switches {
              margin-bottom: 50px;
            }
            .slider {
              font-family: Roboto;
              margin-bottom: 50px;
              
              .slider-header {
                margin-bottom: 70px;
              }
              .slider-label {
                display: block;
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                color: #333333;
                margin-bottom: 50px;
              }
              .settings-header {
                display: block;
                font-style: normal;
                font-weight: bold;
                font-size: 16px;
                color: #333333;
                margin-bottom: 15px;
              }
              .settings-sub {
                margin-bottom: 5px;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 16px;
                color: #000000;
                opacity: 0.5;
                display: block;
              }
            }
          `}
        </style>
      </LayoutMenuNavegation>
    )
  };
};

export default withTranslation('settings')(withAuthSync(SettingsNotifications))
