import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useClientContext } from "../../hooks/useClientContext";
import ClientDetails from "../../components/Clients/ClientDetails";
import AddIcon from '@mui/icons-material/Add'
//import WorkoutForm from "../components/WorkoutForm";

const Clients = () => {
  const [clients, setClients] = useState(null)
  const { dispatch } = useClientContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchClients = async () => {
      if (user.permissions.toLowerCase() === 'standard') {
        var clientid = user.client.toLowerCase()
      } else if (user.permissions.toLowerCase() === 'parent') {
        var clientid = user.parent.toLowerCase()
      }
      else if (user.permissions.toLowerCase() === 'admin') {
        var clientid = '4'
      }
      else {
        var clientid = null
      }

      const response = await fetch('http://localhost:5000/api/v1/clients/' + clientid, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()

      if (response.ok) {
        setClients(json)
        //dispatch({ type: "SET_CLIENTS", payload: json });
      }
    }

    if (user) {
      fetchClients()
    }
  }, [dispatch, user]) //

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Clients" />
      </Box>
      <div className="row data-col-header">
        <div className="col-lg-2">Name</div>
        <div className="col-lg-2">ID</div>
        <div className="col-lg-2">Status</div>
        <div className="col-lg-2">ERPID</div>
        <div className="col-lg-2">ERPParentID</div>
        <div className="col-lg-2">
          <Link to="/clients/create" className="data-add-item">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="clients">
        <div className="data-cards">
          {clients &&
            clients.Clients.map((client) => <ClientDetails key={client.ID} client={client} />)}
        </div>
      </div>
    </Box>
  )
}

export default Clients
