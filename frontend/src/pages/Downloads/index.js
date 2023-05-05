import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { useDownloadContext } from "../../hooks/useDownloadContext";
import DownloadList from "../../components/Downloads/DownloadList";
import AddIcon from '@mui/icons-material/Add'

const Downloads = () => {
  const [downloads, setDownloads] = useState(null)
  const { dispatch } = useDownloadContext()
  const { user } = useAuthContext()
  const { clientid, jobid } = useParams()

  useEffect(() => {
    const fetchDownloads = async () => {

      const response = await fetch(
        'http://localhost:5000/api/v1/clients/' + clientid + 
        '/jobs/' + jobid + '/downloads', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()

      if (response.ok) {
        setDownloads(json)
        //dispatch({ type: "SET_DOWNLOADS", payload: json });
      }
    }

    if (user) {
      fetchDownloads()
    }
  }, [dispatch, user]) //

  return (
      <Box m="20px">
          <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
          >
              <Header title="Downloads" />
              {/* <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                      href="/downloads/create"
                      color="secondary"
                      variant="contained"
                  >
                      Create Download
                  </Button>
              </Box> */}
          </Box>
          <div className="row data-col-header">
              <div className="col-lg-2">RemoteDirectory</div>
              <div className="col-lg-1">ID</div>
              <div className="col-lg-1">Mask</div>
              <div className="col-lg-2">LocalDirectory</div>
              <div className="col-lg-1">Server</div>
              <div className="col-lg-1">IgnoreMask</div>
              <div className="col-lg-1">Convert</div>
              <div className="col-lg-1">Links</div>
              <div className="col-lg-1">
                  <Link to="/downloads/create" className="data-add-item">
                      <IconButton>
                          <AddIcon />
                      </IconButton>
                  </Link>
              </div>
          </div>
          <div className="clients">
              <div className="data-cards">
                  {downloads &&
                      downloads.Downloads.map((download) => (
                          <DownloadList key={download.ID} download={download} />
                      ))}
              </div>
          </div>
      </Box>
  )
}

export default Downloads
