import { Form } from 'formik'
import React from 'react'

const ResetPage = (jwtrToken) => {
  return (
    <div>
        <h1>Reset Password</h1>
        <p>Token: {jwtrToken}</p>
    </div>
  )
}

export default ResetPage