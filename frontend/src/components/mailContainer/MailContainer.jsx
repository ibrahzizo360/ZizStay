import React from 'react'
import "./mailContainer.css"

const MailContainer = () => {
  return (
    <div className="mail">
        <p className="mailTitle">Save time, save money!</p>
        <span className="desc">sign up and we'll send the best deals to you</span>
        <div className="mailInputContainer">
            <input type="text" className="mailInput" placeholder="Your email address"/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailContainer