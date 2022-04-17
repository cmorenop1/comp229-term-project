import React from 'react'
import { EditProfile } from '../components/EditProfile'

export default function ProfileView() {
  return (
    <div className='container'>
      <div className="add-form">
        <h1>Edit Profile</h1>
        <div className='form-element'>
          <EditProfile />
        </div>
      </div>
    </div>
  )
}