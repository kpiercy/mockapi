import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useJobContext } from '../../hooks/useJobContext'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const JobList = ({ job }) => {
  const [jobs, setJobs] = useState(null)
  const { user } = useAuthContext()
  const { dispatch } = useJobContext()
  const { clientid } = useParams()

//   const handleDelete = async () => {
//       if (!user) {
//         return
//       }

//     const response = await fetch('http://localhost:5000/api/v1/clients/' + clientid +'/jobs', {
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
    const url = `/jobs/${job.ID}/${method}`
    return url
  }

  return (
    <div className="container-fluid">
      <div className="row data-row">
        <div className="col-lg-1">{job.Name}</div>
        <div className="col-lg-1">{job.ID}</div>
        <div className="col-lg-1">{job.Active}</div>
        <div className="col-lg-1">{job.ParentID}</div>
        <div className="col-lg-1">{job.ClientID}</div>
        <div className="col-lg-1">{job.RootPath}</div>
        <div className="col-lg-1">
          <Link to={`/clients/${clientid}/jobs/${job.ID}/contacts`} state={{ clientid: clientid, jobid: job.ID }}>
            <IconButton>
              <ContactsOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
          <Link to={`/clients/${clientid}/jobs/${job.ID}/downloads`} state={{ clientid: clientid, jobid: job.ID }}>
            <IconButton>
              <FileDownloadOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
          <Link to={`/clients/${clientid}/jobs/${job.ID}/processes`} state={{ clientid: clientid, jobid: job.ID }}>
            <IconButton>
              <RuleOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
          <Link to={`/clients/${clientid}/jobs/${job.ID}/workflows`} state={{ clientid: clientid, jobid: job.ID }}>
            <IconButton>
              <AccountTreeOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
          <Link to={`/clients/${clientid}/jobs/${job.ID}/facilities`} state={{ clientid: clientid, jobid: job.ID }}>
            <IconButton>
              <LocationOnOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
          <Link to={`/clients/${clientid}/jobs/${job.ID}/returns/logs`} state={{ clientid: clientid, jobid: job.ID }}>
            <IconButton>
              <FileUploadOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
          <Link to={`/clients/${clientid}/jobs/${job.ID}/orders`} state={{ clientid: clientid, jobid: job.ID }}>
            <IconButton>
              <ReceiptOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
          <Link to={`/clients/${clientid}/jobs/${job.ID}/changes`} state={{ clientid: clientid, jobid: job.ID }}>
            <IconButton>
              <TrackChangesOutlinedIcon className="modify-details-icon"/>
            </IconButton>
          </Link>
        </div>
        <div className="col-lg-1" >
          <Link to={generateRoute('detail')}>
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

export default JobList;