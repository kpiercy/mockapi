import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { useInvoiceContext } from "../../hooks/useInvoiceContext";
import InvoiceList from "../../components/Invoices/InvoiceList";
import AddIcon from '@mui/icons-material/Add'

const Invoices = () => {
  const [invoices, setInvoices] = useState(null)
  const { dispatch } = useInvoiceContext()
  const { user } = useAuthContext()
  const { clientid } = useParams()

  useEffect(() => {
    const fetchInvoices = async () => {
      // if (user.permissions.toLowerCase() === 'standard') {
      //   var clientid = user.client.toLowerCase()
      // } else if (user.permissions.toLowerCase() === 'parent') {
      //   var clientid = user.parent.toLowerCase()
      // }
      // else if (user.permissions.toLowerCase() === 'admin') {
      //   var clientid = '4'
      // }
      // else {
      //   var clientid = null
      // }

      const response = await fetch('http://localhost:5000/api/v1/clients/' + clientid + '/invoices', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()

      if (response.ok) {
        setInvoices(json)
        //dispatch({ type: "SET_CLIENTS", payload: json });
      }
    }

    if (user) {
      fetchInvoices()
    }
  }, [dispatch, user]) //

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Invoices" />
      </Box>
      <div className="row data-col-header">
        <div className="col-lg-1">Project</div>
        <div className="col-lg-1">ID</div>
        <div className="col-lg-1">Total Statements</div>
        <div className="col-lg-1">Total Services</div>
        <div className="col-lg-1">Total Postage</div>
        <div className="col-lg-1">Total Taxes</div>
        <div className="col-lg-1">Links</div>
        <div className="col-lg-1">
          <Link to="/invoices/create" className="data-add-item">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="clients">
        <div className="data-cards">
          {invoices &&
            invoices.Invoices.map((invoice) => <InvoiceList key={invoice.ID} invoice={invoice} />)}
        </div>
      </div>
    </Box>
  )
}

export default Invoices