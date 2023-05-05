import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useContactContext } from '../../hooks/useContactContext'

const ContactList = ({ contact }) => {
  const [contacts, setContacts] = useState(null)
  const { user } = useAuthContext()
  const { dispatch } = useContactContext()
  const { clientid, jobid } = useParams()

  const handleDelete = async () => {
      if (!user) {
        return
      }

    const response = await fetch(
        'http://localhost:5000/api/v1/clients/' + clientid + 
        '/jobs/' + jobid + '/contacts/' + contact.ID, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    if (response.ok) {
      alert(contact.LastName + ', '+ contact.FirstName + ' was deactivated')
      setContacts(json)
      //dispatch({type: 'SET_CONTACTS', payload: json})
    }
  }

  const generateRoute = (method) => {
    if (!user) {
      return
    }
    const url = `/contacts/${contact.ID}/${method}`
    return url
  }

  return (
    <div className="container-fluid">
      <div className="row data-row">
        <div className="col-md-1">{contact.LastName}, {contact.FirstName}</div>
        <div className="col-md-1">{contact.ID}</div>
        <div className="col-md-1">{contact.ContactType}</div>
        <div className="col-md-1">{contact.Active}</div>
        <div className="col-md-1">{contact.Email}</div>
        <div className="col-md-1">{contact.Phone}</div>
        <div className="col-md-1" >
          {/* <Link to={`/clients/${clientid}/contacts/${contact.ID}`}>
            <IconButton>
              <SearchOutlined className="modify-details-icon" />
            </IconButton>
          </Link> */}
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

export default ContactList