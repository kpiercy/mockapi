import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useReturnLogContext } from '../../hooks/useReturnLogContext'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'

const ReturnLogList = ({ log }) => {
    const [returnLogs, setReturnLogs] = useState(null)
    const { user } = useAuthContext()
    const { dispatch } = useReturnLogContext()
    const { clientid, jobid } = useParams()

    const handleDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch(
            'http://localhost:5000/api/v1/clients/' +
                clientid +
                '/jobs/' +
                jobid +
                '/returns/' +
                log.ID,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        const json = await response.json()

        if (response.ok) {
            alert(log.ID + ' was deactivated')
            setReturnLogs(json)
            //dispatch({type: 'SET_RETURNS', payload: json})
        }
    }

    const handleRetry = async () => {
        if (!user) {
            return
        }

        const response = await fetch(
            'http://localhost:5000/api/v1/clients/' +
                clientid +
                '/jobs/' +
                jobid +
                '/returns/triggers?RunSeq=' +
                log.RunSeq,
            {
                method: 'UPDATE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        const json = await response.json()

        if (response.ok) {
            alert(log.RunSeq + ' report uploads have been requeued')
            setReturnLogs(json)
            //dispatch({type: 'SET_RETURNS', payload: json})
        }
    }

    const generateRoute = (method) => {
        if (!user) {
            return
        }
        const url = `/returns/${log.ID}/${method}`
        return url
    }

    const checkError = () => {
        if (log.Status === 'Error') {
            return <ErrorOutlinedIcon />
        } else {
            return <CheckOutlinedIcon />
        }
    }

    return (
        <div className="container-fluid">
            <div className="row data-row">
                <div className="col-lg-1">{log.ID}</div>
                <div className="col-lg-1">{log.RunSeq}</div>
                <div className="col-lg-1">{checkError()}</div>
                <div className="col-lg-1">{log.Type}</div>
                <div className="col-lg-1">{log.TriggeredAt}</div>
                <div className="col-lg-2">{log.ReportUploaded}</div>
                <div className="col-lg-1">{log.RemoteDirectory}</div>
                <div className="col-lg-1">{log.UploadTimestamp}</div>
                <div className="col-lg-1">
                    <IconButton onClick={handleRetry}>
                        <ReplayOutlinedIcon className="modify-details-icon" />
                    </IconButton>
                </div>
                <div className="col-lg-1">
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

export default ReturnLogList
