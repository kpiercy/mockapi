import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
// import SearchOutlined from '@mui/icons-material/SearchOutlined'

const UserDetails = ({ auser }) => {
  const [users, setUsers] = useState(null)
  const { user } = useAuthContext()

  const handleDelete = async () => {
    if (!user) {
      return
    }

    if (user.permissions.toLowerCase() === 'standard') {
      var clientid = user.client.toLowerCase()
    } else if (user.permissions.toLowerCase() === 'parent') {
      var clientid = user.parent.toLowerCase()
    } else if (user.permissions.toLowerCase() === 'admin') {
      var clientid = '4'
    } else {
      var clientid = null
    }

    const response = await fetch('http://localhost:5000/api/v1/clients/' + clientid + '/users/' + auser.ID, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    if (response.ok) {
      alert(auser.Username + ' was deactivated')
      setUsers(json)
      //dispatch({type: 'SET_JOBS', payload: json})
    }
  }

  const handleUpdate = async () => {
    if (!user) {
      return
    }

    if (user.permissions.toLowerCase() === 'standard') {
      var clientid = user.client.toLowerCase()
    } else if (user.permissions.toLowerCase() === 'parent') {
      var clientid = user.parent.toLowerCase()
    } else if (user.permissions.toLowerCase() === 'admin') {
      var clientid = '4'
    } else {
      var clientid = null
    }

    const response = await fetch(
      'http://localhost:5000/api/v1/clients/' + clientid + '/users/',
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const json = await response.json()

    if (response.ok) {
      setUsers(json)
      //dispatch({type: 'SET_JOBS', payload: json})
    }
  }

  // const handleInspect = async () => {

  // }

  return (
    <div className="container-fluid">
      <div className="row data-row">
        <div className="col-lg-2">{auser.Username}</div>
        <div className="col-lg-2">{auser.ID}</div>
        <div className="col-lg-2">{auser.ClientID}</div>
        <div className="col-lg-2">{auser.Active.toString()}</div>
        <div className="col-lg-2">{auser.PermissionLvl}</div>
        <div className="col-lg-2">
          {/* <IconButton className={handleInspect}>
            <SearchOutlined className="modify-details-icon" />
          </IconButton> */}
          <IconButton onClick={handleUpdate}>
            <EditIcon className="modify-details-icon" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon className="modify-details-icon" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
