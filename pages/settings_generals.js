import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SettingLayout from "../components/SettingLayout";
import SelectItem from "../components/SelectItem";
import { withAuthSync, updateUserAttributes, ClientContext } from '../utils/auth'
import { i18n, withTranslation } from '../i18n'
import moment from "moment"
import 'moment-timezone';
import {determineTimezone, determineLanguage, timezones, languages} from '../utils/locale'
import { toast } from 'react-toastify'

import './main.scss'

class SettingsGenerals extends React.Component {
  static contextType = ClientContext;

  getInitialProps = async () => ({
    namespacesRequired: ['settings'],
  })

  constructor(props) {
    super(props);

    this.state = {
      language: {},
      timezone: {},
    };

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleTimezoneChange = this.handleTimezoneChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      language: determineLanguage(this.context.user),
      timezone: determineTimezone(this.context.user),
    })
  }

  handleTimezoneChange = async selectedOption => {
    let timezone = selectedOption.value

    moment.tz.setDefault(timezone);

    this.setState({
      timezone: selectedOption
    })

    let data = await updateUserAttributes({
      'custom:timezone': timezone
    })

    toast(this.props.t('settings-saved'), {
      className: 'notification success'
    })
  }

  handleLanguageChange = async selectedOption => {
    let language = selectedOption.value

    i18n.changeLanguage(language)
    moment.locale(language);

    this.setState({
      language: selectedOption
    })

    let data = await updateUserAttributes({
      'custom:language': language
    })

    toast(this.props.t('settings-saved'), {
      className: 'notification success'
    })
  }

  render() {
    return (
      <LayoutMenuNavegation>
        <Head title={`${this.props.t('language-region')} | Lidbot`}/>
        <SettingLayout>
          <div className="input">
            <SelectItem
              label={this.props.t('language')}
              value={this.state.language}
              onChange={this.handleLanguageChange}
              options={languages}
            />
          </div>
          <div>
              <SelectItem
                label={this.props.t('timezone')}
                value={this.state.timezone}
                onChange={this.handleTimezoneChange}
                options={timezones}
              />
          </div>
        </SettingLayout>
        <style jsx>
          {`
            .input {
              margin-bottom: 35px;
            }
          `}
        </style>
      </LayoutMenuNavegation>
    )
  }
};

export default withTranslation('settings')(withAuthSync(SettingsGenerals))
