import { Col, Row } from 'antd'
import styles from '../../asset/scss/LoginPage.module.scss'
import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterPage'

const LoginPage = () => {
  return (
   <>
    <div className={`${styles.loginContainer}`}>
        
                <div className={`${styles.leftSide}` }>
                    <LoginForm/>
                </div>
\
    </div>
   </>
  )
}

export default LoginPage