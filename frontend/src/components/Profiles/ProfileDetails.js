import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from 'react-router-dom'

const ProfileDetails = ({ profile }) => {
  const [profiles, setProfiles] = useState(null)
  const { user } = useAuthContext()

  // const handleClick = async () => {
  //   if (!user) {
  //     return
  //   }

  //   const response = await fetch('http://localhost:5000/api/v1/clients/users/me', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })

  //   const json = await response.json()

  //   if (response.ok) {
  //     setProfiles(json)
  //     //dispatch({type: 'SET_JOBS', payload: json})
  //   }
  // }

  return (
    <div className="data-cards">
      <h4>{profile.Username}</h4>
      <p>
        <strong>ID: </strong>
        {profile.ID}
      </p>
      <p>
        <strong>ERP ID: </strong>
        {profile.ClientID}
      </p>
      <p>
        <strong>PermissionLvl: </strong>
        {profile.PermissionLvl}
      </p>
      {/* <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span> */}
    </div>
  )
}

export default ProfileDetails
