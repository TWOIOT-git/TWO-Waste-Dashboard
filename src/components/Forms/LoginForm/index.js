import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import { ClipLoader } from 'react-spinners';

const LoginForm = ({ onSubmit, onChange, controls, disabled, loading }) => (
  <div className={styles.Card}>
    <div className={styles.CardContent}>
      <form onSubmit={onSubmit} className={styles.Form}>

        <div>
          <p className={styles.TWOIOT}>TWOIOT</p>
          <p className={styles.WASTE}>WASTE</p>
        </div>

        <div>

          <div>
            <p className={styles.Description}>Welcome back!<br />Login to continue your smart waste management.</p>
          </div>

          <div className={styles.FormControl}>
            <input
              id="email-input"
              name="email"
              value={controls.email.value}
              placeholder="Email"
              onChange={(event) => onChange(event, 'email')}
              type="email"
              className={styles.Input}
            />
            {controls.email.errors.message && (
              <small id="email-input-text" className={styles.TextHelper}>
                {controls.email.errors.message}
              </small>
            )
            }
          </div>

          <div className={styles.FormControl}>
            <input
              id="password-input"
              name="password"
              value={controls.password.value}
              placeholder="Password"
              onChange={(event) => onChange(event, 'password')}
              type="password"
              className={styles.Input}
            />
            {controls.password.errors.message && (
              <small id="password-input-text" className={styles.TextHelper}>
                {controls.password.errors.message}
              </small>
            )
            }
          </div>

        </div>

        <div className={styles.BoxMarginTop}>
          {
            loading ? (
              <div className={styles.ClipLoaderCenter}>
                <ClipLoader
                  color={'var(--orange)'}
                  loading={true}
                  size={75}
                />
              </div>
            ) : (
                <button
                  color="primary"
                  type="submit"
                  disabled={disabled}
                  className={styles.Button}
                >
                  LOGIN
              </button>
              )
          }
        </div>
      </form>
    </div>
  </div>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  controls: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}

export default LoginForm