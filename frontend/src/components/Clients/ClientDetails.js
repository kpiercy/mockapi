import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'

const ClientDetails = ({ client }) => {
  const [jobs, setJobs] = useState(null)
  const { user } = useAuthContext()

  const handleDelete = async () => {
      if (!user) {
        return
      }

    const response = await fetch('http://localhost:5000/api/v1/clients/' + client.GUID, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    if (response.ok) {
      alert(client.Name + ' was deactivated')
      setJobs(json)
      //dispatch({type: 'SET_JOBS', payload: json})
    }
  }

  const handleUpdate = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:5000/api/v1/clients/' + client.GUID, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    if (response.ok) {
      setJobs(json)
      //dispatch({type: 'SET_JOBS', payload: json})
    }
  }

  const handleInspect = async () => {

  }

  return (
    <div className="container-fluid">
      <div className="row data-row">
        <div className="col-lg-2">{client.Name}</div>
        <div className="col-lg-2">{client.GUID}</div>
        <div className="col-lg-2">{client.Status}</div>
        <div className="col-lg-2">{client.ERP_GUID}</div>
        <div className="col-lg-2">{client.ERP_Parent_GUID}</div>
        <div className="col-lg-2">
          <IconButton className={handleInspect}>
            <SearchOutlined className="modify-details-icon" />
          </IconButton>
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

export default ClientDetails;
