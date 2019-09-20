import moment from "moment"
import 'moment-timezone';
import _ from 'underscore'

const languages = [
  { value: 'de-DE', label: 'Deutsch'},
  { value: 'es-ES', label: 'Español'},
  { value: 'en-US', label: 'English'},
  { value: 'zh-TW', label: '中文'},
]

const timezones = getTimeZones()

function getTimeZones() {
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

function determineLanguage(user) {
  let language

  if(user) {
    let userLanguage = user.attributes['custom:language']
    language = languages.find(o => o.value === userLanguage)
  }

  if(!language) {
    language = languages.find(o => o.value === navigator.language)
    if(!language) {
      language = languages.find(o => o.value === 'en-US')
    }
  }

  console.log(language)

  return language
}


function determineTimezone(user) {
  let userTimezone = user.attributes['custom:timezone']

  let timezone = timezones.find(o => o.value === userTimezone)
  if(!timezone) {
    let browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    timezone = timezones.find(o => o.value === browserTimezone)
  }

  return timezone
}

export {
  determineTimezone,
  determineLanguage,
  timezones,
  languages
}
