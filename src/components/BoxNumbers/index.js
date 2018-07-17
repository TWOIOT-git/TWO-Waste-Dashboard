import React from 'react'
import Title from '../Title';
import BoxBackground from '../BoxBackground'
import styles from './styles.module.css'
import { Col, Container, Row } from 'react-grid-system';


const BoxNumbers = ({
  title,
  firstNumber,
  firstText,
  secondNumber,
  secondText
}) => {
  return (
    <BoxBackground>
      <div className={styles.BoxNumbers}>
        <Container>
          <Row>
            <Col>
              <Title>{title}</Title>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <p className={[styles.BoxNumbers_Number]}>
                {firstNumber}
              </p>
              <p className={[styles.BoxNumbersText]}>
                {firstText}
              </p>
            </Col>
            <Col>
              <p className={[styles.BoxNumbers_Number, styles.BoxNumbers_NumberDark].join(' ')}>
                {secondNumber}
              </p>
              <p className={[styles.BoxNumbersText]}>
                {secondText}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </BoxBackground>
  )
}

export default BoxNumbers
