import { Col, Row } from 'antd'
import styles from '../../asset/scss/LoginPage.module.scss'
import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterPage'

const LoginPage = () => {
  return (
   <>
    <div className={`${styles.loginContainer}`}>
        <Row>
            <Col span={8}  >
                <div className={`${styles.leftSide}` }>
                    <RegisterForm/>
                </div>
            </Col>
            <Col span={16}>
                <div className={`${styles.rightSide}`}></div>
            </Col>
        </Row>
    </div>
   </>
  )
}

export default LoginPage