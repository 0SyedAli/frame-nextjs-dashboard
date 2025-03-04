import Link from 'next/link'
import React from 'react'

const Signin = () => {
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
          <div className="">
            <div className="remember form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
          </div>
          <div className='text-center'>
            <Link href="/dashboard" className="theme-btn2">Sign in</Link>
            <div className='register_link'>
                <h5>Don't have an account?<Link href="signup"> Signup</Link></h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin