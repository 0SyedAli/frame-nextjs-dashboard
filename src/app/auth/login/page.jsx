import React from 'react'

const Login = () => {
  return (
    <div className="content align-self-center mw-600">
      <div className='auth_container'>
        <div className='auth_head'>
          <h2>Getting Started</h2>
          <p>Elevate your salon with a seamless setup, styled for success.</p>
        </div>
        <form action="#!">
          <input type="text" placeholder='Username' />
          <input type="password" placeholder='Password' />
          <div className='remember'>
            <div className="remember form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
          </div>
        </form>
        <button className="theme-btn2">Sign in</button>
      </div>
    </div>
  )
}

export default Login