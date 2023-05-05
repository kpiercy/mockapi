import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { useContactContext } from "../../hooks/useContactContext";
import ContactList from "../../components/Contacts/ContactList";
import AddIcon from '@mui/icons-material/Add'

const Contacts = () => {
  const [contacts, setContacts] = useState(null)
  const { dispatch } = useContactContext()
  const { user } = useAuthContext()
  const { clientid, jobid } = useParams()

  useEffect(() => {
    const fetchContacts = async () => {
      // if (user.permissions.toLowerCase() === 'standard') {
      //   var contactid = user.contact.toLowerCase()
      // } else if (user.permissions.toLowerCase() === 'parent') {
      //   var contactid = user.parent.toLowerCase()
      // }
      // else if (user.permissions.toLowerCase() === 'admin') {
      //   var contactid = '4'
      // }
      // else {
      //   var contactid = null
      // }

      const response = await fetch(
        'http://localhost:5000/api/v1/clients/' + clientid + 
        '/jobs/' + jobid + '/contacts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()

      if (response.ok) {
        setContacts(json)
        //dispatch({ type: "SET_CLIENTS", payload: json });
      }
    }

    if (user) {
      fetchContacts()
    }
  }, [dispatch, user]) //

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Contacts" />
      </Box>
      <div className="row data-col-header">
        <div className="col-md-1">Name</div>
        <div className="col-md-1">ID</div>
        <div className="col-md-1">Type</div>
        <div className="col-md-1">Active</div>
        <div className="col-md-1">Email</div>
        <div className="col-md-1">Phone</div>
        <div className="col-md-1">
          <Link to="/contacts/create" className="data-add-item">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="clients">
        <div className="data-cards">
          {contacts &&
            contacts.Contacts.map((contact) => <ContactList key={contact.ID} contact={contact} />)}
        </div>
      </div>
    </Box>
  )
}

export default Contacts
