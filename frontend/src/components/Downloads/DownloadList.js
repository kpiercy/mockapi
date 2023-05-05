import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useDownloadContext } from '../../hooks/useDownloadContext'

const DownloadList = ({ download }) => {
  const [downloads, setDownloads] = useState(null)
  const { user } = useAuthContext()
  const { dispatch } = useDownloadContext()
  const { clientid, jobid } = useParams()

  const handleDelete = async () => {
      if (!user) {
        return
      }

    const response = await fetch(
        'http://localhost:5000/api/v1/clients/' + clientid + 
        '/jobs/' + jobid + '/downloads/' + download.ID, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    if (response.ok) {
      alert(download.LastName + ', '+ download.FirstName + ' was deactivated')
      setDownloads(json)
      //dispatch({type: 'SET_DOWNLOADS', payload: json})
    }
  }

  const generateRoute = (method) => {
    if (!user) {
      return
    }
    const url = `/downloads/${download.ID}/${method}`
    return url
  }

  return (
    <div className="container-fluid">
      <div className="row data-row">
        <div className="col-lg-2">{download.RemoteDirectory}</div>
        <div className="col-lg-1">{download.ID}</div>
        <div className="col-lg-1">{download.Mask}</div>
        <div className="col-lg-2">{download.LocalDirectory}</div>
        <div className="col-lg-1">{download.Server}</div>
        <div className="col-lg-1">{download.IgnoreMask}</div>
        <div className="col-lg-1">{download.Convert}</div>
        <div className="col-lg-1" >
          <Link to={`/clients/${clientid}/jobs/${jobid}/downloads/${download.ID}`}>
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

export default DownloadList