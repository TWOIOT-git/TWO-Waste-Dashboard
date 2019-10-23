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

  handleTimezoneChange = selectedOption => {
    let timezone = selectedOption.value

    moment.tz.setDefault(timezone);

    this.setState({
      timezone: selectedOption
    })

    updateUserAttributes({
      'custom:timezone': timezone
    })
  }

  handleLanguageChange = selectedOption => {
    let language = selectedOption.value

    i18n.changeLanguage(language)
    moment.locale(language);

    this.setState({
      language: selectedOption
    })

    updateUserAttributes({
      'custom:language': language
    })
  }

  render() {
    return (
      <LayoutMenuNavegation>
        <Head title={'lidbot - ' + this.props.t('language-region')}/>
        <SettingLayout>
          <div>
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
      </LayoutMenuNavegation>
    )
  }
};

export default withTranslation('settings')(withAuthSync(SettingsGenerals))
