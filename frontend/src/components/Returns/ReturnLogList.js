import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useReturnLogContext } from '../../hooks/useReturnLogContext'
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined'

const ReturnLogList = ({ returnlog }) => {
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
                returnlog.ID,
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
            alert(
                returnlog.ID +
                    ' was deactivated'
            )
            setReturnLogs(json)
            //dispatch({type: 'SET_RETURNS', payload: json})
        }
    }

    const generateRoute = (method) => {
        if (!user) {
            return
        }
        const url = `/returns/${returnlog.ID}/${method}`
        return url
    }

    return (
        <div className="container-fluid">
            <div className="row data-row">
                <div className="col-lg-1">{returnlog.ID}</div>
                <div className="col-lg-1">{returnlog.RunSeq}</div>
                <div className="col-lg-1">{returnlog.Status}</div>
                <div className="col-lg-1">{returnlog.Type}</div>
                <div className="col-lg-1">{returnlog.TriggeredAt}</div>
                <div className="col-lg-2">{returnlog.ReportUploaded}</div>
                <div className="col-lg-1">{returnlog.RemoteDirectory}</div>
                <div className="col-lg-1">{returnlog.UploadedAt}</div>
                <div className="col-lg-1">
                    
                </div>
                <div className="col-lg-1">
                    <Link
                        to={`/clients/${clientid}/jobs/${jobid}/returns/${returnlog.ID}`}
                    >
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

export default ReturnLogList
