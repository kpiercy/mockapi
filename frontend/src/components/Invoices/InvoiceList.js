import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useInvoiceContext } from '../../hooks/useInvoiceContext'
import DiscountIcon from '@mui/icons-material/Discount';
import PaymentsIcon from '@mui/icons-material/Payments';

const InvoiceList = ({ invoice }) => {
  const [invoices, setInvoices] = useState(null)
  const { user } = useAuthContext()
  const { dispatch } = useInvoiceContext()
  const { clientid } = useParams()

//   const handleDelete = async () => {
//       if (!user) {
//         return
//       }

//     const response = await fetch('http://localhost:5000/api/v1/clients/' + clientid +'/invoices', {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({Clients: [{clientid: client.ID}]})
//     })

//     const json = await response.json()

//     if (response.ok) {
//       alert(client.Name + ' was deactivated')
//       setClients(json)
//       //dispatch({type: 'SET_CLIENTS', payload: json})
//     }
//   }

  const generateRoute = (method) => {
    if (!user) {
      return
    }
    const url = `/invoices/${invoice.ID}/${method}`
    return url
  }

  return (
    <div className="container-fluid">
      <div className="row data-row">
        <div className="col-lg-1">{invoice.Project}</div>
        <div className="col-lg-1">{invoice.ID}</div>
        <div className="col-lg-1">{invoice.TotalStatements}</div>
        <div className="col-lg-1">{invoice.TotalServices}</div>
        <div className="col-lg-1">{invoice.TotalPostage}</div>
        <div className="col-lg-1">{invoice.TotalTaxes}</div>
        <div className="col-lg-1">
          <Link to={`/clients/${clientid}/invoices/${invoice.ID}/deposits`}>
            <IconButton>
              <PaymentsIcon className="modify-details-icon" />
            </IconButton>
          </Link>
          <Link to={`/clients/${clientid}/invoices/${invoice.ID}/credits`}>
            <IconButton>
              <DiscountIcon className="modify-details-icon" />
            </IconButton>
          </Link>
        </div>
        <div className="col-lg-1" >
          <Link to={`/clients/${clientid}/invoices/${invoice.ID}`}>
            <IconButton>
              <SearchOutlined className="modify-details-icon" />
            </IconButton>
          </Link>
          <Link to={generateRoute('update')}>
            <IconButton>
                <EditIcon className="modify-details-icon" />
            </IconButton>
          </Link>
          {/* <IconButton onClick={handleDelete}>
            <DeleteIcon className="modify-details-icon" />
          </IconButton> */}
        </div>
      </div>
    </div>
  )
}

export default InvoiceList;