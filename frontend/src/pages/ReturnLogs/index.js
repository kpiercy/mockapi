import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useReturnLogContext } from '../../hooks/useReturnLogContext'
import ReturnLogList from '../../components/Returns/ReturnLogList'
import AddIcon from '@mui/icons-material/Add'

const ReturnLogs = () => {
    const [returnLogs, setReturnLogs] = useState(null)
    const { dispatch } = useReturnLogContext()
    const { user } = useAuthContext()
    const { clientid, jobid } = useParams()

    useEffect(() => {
        const fetchReturnLogs = async () => {
            const response = await fetch(
                'http://localhost:5000/api/v1/clients/' +
                    clientid +
                    '/jobs/' +
                    jobid +
                    '/returns/logs?paginate=false',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            const json = await response.json()

            if (response.ok) {
                setReturnLogs(json)
                //dispatch({ type: "SET_RETURNS", payload: json });
            }
        }

        if (user) {
            fetchReturnLogs()
        }
    }, [dispatch, user]) //

    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header title="Returns" />
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                      href="/clients/:clientid/jobs/:jobid/returns"
                      color="secondary"
                      variant="contained"
                  >
                      Return Settings
                  </Button>
              </Box>
            </Box>
            <div className="row data-col-header">
                <div className="col-lg-1">ID</div>
                <div className="col-lg-1">RunSeq</div>
                <div className="col-lg-1">Status</div>
                <div className="col-lg-1">Type</div>
                <div className="col-lg-1">TriggeredAt</div>
                <div className="col-lg-2">ReportUploaded</div>
                <div className="col-lg-1">RemoteDirectory</div>
                <div className="col-lg-1">UploadedAt</div>
                <div className="col-lg-1">Links</div>
                <div className="col-lg-1">
                    <Link to="/returns/create" className="data-add-item">
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div className="clients">
                <div className="data-cards">
                    {returnLogs &&
                        returnLogs.Logs.map((returnlog) => (
                            <ReturnLogList key={returnlog.ID} returnlog={returnlog} />
                        ))}
                </div>
            </div>
        </Box>
    )
}

export default ReturnLogs
