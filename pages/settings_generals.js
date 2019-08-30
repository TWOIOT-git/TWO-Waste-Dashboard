import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SwitchItem from "../components/SwitchItem";
import SettingLayout from "../components/SettingLayout";
import SelectItem from "../components/SelectItem";
import { withAuthSync, updateUserAttributes, ClientContext } from '../utils/auth'
import { i18n, withTranslation } from '../i18n'
import moment from "moment"
import 'moment-timezone';

const languages = [
  { value: 'de-DE', label: 'Deutsch'},
  { value: 'es-ES', label: 'Español'},
  { value: 'en-US', label: 'English'},
  { value: 'zh-TW', label: '中文'},
]

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
    this.timeZones= this.timeZones.bind(this);
  }

  componentDidMount() {
    let timezones = this.timeZones()
    let timezone = this.context.user.attributes['custom:timezone']
    let language = this.context.user.attributes['custom:language']

    this.setState({
      language: languages.find(o => o.value === language),
      timezone: timezones.find(o => o.value === timezone),
    })
  }

  timeZones() {
    const timeZones = moment.tz.names();
    const offsetTmz = [];

    for (const i in timeZones) {
      const tz = moment.tz(timeZones[i]).format('Z').replace(':00', '').replace(':30', '.5');
      let x = (tz === 0) ? 0 : parseInt(tz).toFixed(2);

      const timeZone = {
        label: `(GMT${moment.tz(timeZones[i]).format('Z')})${timeZones[i]}`,
        value: `${timeZones[i]}`,
        time: `${x}`,
      };
      offsetTmz.push(timeZone);
    }

    return _.sortBy(offsetTmz, [function (el) { return -(el.time); }]);
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
    const timezones = this.timeZones();

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
          {/*<SwitchItem*/}
          {/*  title={this.props.t('location-info')}*/}
          {/*  description={this.props.t('location-info-sub')}*/}
          {/*  active={false}*/}
          {/*/>*/}
        </SettingLayout>
      </LayoutMenuNavegation>
    )
  }
};

export default withTranslation('settings')(withAuthSync(SettingsGenerals))
