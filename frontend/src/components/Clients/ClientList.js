import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useClientContext } from '../../hooks/useClientContext'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

const ClientList = ({ client }) => {
  const [clients, setClients] = useState(null)
  const { user } = useAuthContext()
  const { dispatch } = useClientContext()

  const handleDelete = async () => {
      if (!user) {
        return
      }

    const response = await fetch('http://localhost:5000/api/v1/clients/' + client.ID, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Clients: [{clientid: client.ID}]})
    })

    const json = await response.json()

    if (response.ok) {
      alert(client.Name + ' was deactivated')
      setClients(json)
      //dispatch({type: 'SET_CLIENTS', payload: json})
    }
  }

  const generateRoute = (method) => {
    if (!user) {
      return
    }
    const url = `/clients/${client.ID}/${method}`
    return url
  }

  return (
    <div className="container-fluid">
      <div className="row data-row">
        <div className="col-lg-1">{client.Name}</div>
        <div className="col-lg-1">{client.ID}</div>
        <div className="col-lg-1">{client.Status}</div>
        <div className="col-lg-1">{client.ParentID}</div>
        <div className="col-lg-1">{client.ERPID}</div>
        <div className="col-lg-1">{client.ERPParentID}</div>
        <div className="col-lg-1">{client.ERPCode}</div>
        <div className="col-lg-1">{client.Type}</div>
        <div className="col-lg-1">
          <Link to={`/clients/${client.ID}/jobs`} state={{ clientid: client.ID }}>
            <IconButton>
              <WorkOutlineOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
          <Link to={`/clients/${client.ID}/invoices`} state={{ clientid: client.ID }}>
            <IconButton>
              <ReceiptLongOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
        </div>
        <div className="col-lg-1" >
          <Link to={generateRoute('detail')} state={{clientid: client.ID}}>
            <IconButton>
              <SearchOutlined className="modify-details-icon" />
            </IconButton>
          </Link>
          <Link to={generateRoute('update')}>
            <IconButton>
                <EditIcon className="modify-details-icon" />
            </IconButton>
          </Link>
          <IconButton onClick={handleDelete}>
            <DeleteIcon className="modify-details-icon" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default ClientList;
