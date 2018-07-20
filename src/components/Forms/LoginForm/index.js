import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormHelperText, Input, InputLabel, CardContent } from '@material-ui/core'
import red from '@material-ui/core/colors/red';
import styles from './styles.module.css'

const LoginForm = ({ onSubmit, onChange, controls, disabled }) => (
  <div className={styles.Card}>
    <CardContent className={styles.CardContent}>
      <form action="/" onSubmit={onSubmit} className={styles.Form}>

        <FormControl>
          <p className={styles.TWOIOT}>TWOIOT</p>
          <p className={styles.WASTE}>WASTE</p>
        </FormControl>

        <div>

          <FormControl>
            <p className={styles.Description}>Welcome back!<br />Login to continue your smart waste management.</p>
          </FormControl>

          <FormControl className={styles.FormControl}>
            <InputLabel htmlFor="email-input" className={styles.Label}>Email</InputLabel>
            <Input
              id="email-input"
              name="email"
              value={controls.email.value}
              onChange={(event) => onChange(event, 'email')}
              type="email"
              className={styles.Input}
            />
            {controls.email.errors.message && (
              <FormHelperText id="email-input-text" style={{ color: red[500] }}>
                {controls.email.errors.message}
              </FormHelperText>
            )
            }
          </FormControl>

          <FormControl className={styles.FormControl}>
            <InputLabel htmlFor="password-input" className={styles.Label}>Password</InputLabel>
            <Input
              id="password-input"
              name="password"
              value={controls.password.value}
              onChange={(event) => onChange(event, 'password')}
              type="password"
              className={styles.Input}
            />
            {controls.password.errors.message && (
              <FormHelperText id="password-input-text" style={{ color: red[500] }}>
                {controls.password.errors.message}
              </FormHelperText>
            )
            }
          </FormControl>

        </div>

        <div className={styles.BoxMarginTop}>
          <button
            color="primary"
            type="submit"
            disabled={disabled}
            className={styles.Button}
          >
            LOGIN
          </button>
        </div>
      </form>
    </CardContent>
  </div>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  controls: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default LoginForm