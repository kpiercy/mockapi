import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useReturnContext } from '../../hooks/useReturnContext'
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined'

const ReturnList = ({ upload }) => {
    const [returns, setReturns] = useState(null)
    const { user } = useAuthContext()
    const { dispatch } = useReturnContext()
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
                upload.ID,
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
            alert(upload.ID + ' was deactivated')
            setReturns(json)
            //dispatch({type: 'SET_RETURNS', payload: json})
        }
    }

    const generateRoute = (method) => {
        if (!user) {
            return
        }
        const url = `/returns/${upload.ID}/${method}`
        return url
    }

    return (
        <div className="container-fluid">
            <div className="row data-row">
                <div className="col-lg-1">{upload.ID}</div>
                <div className="col-lg-2">{upload.RemoteDirectory}</div>
                <div className="col-lg-1">{upload.Mask}</div>
                <div className="col-lg-2">{upload.LocalDirectory}</div>
                <div className="col-lg-1">{upload.ServerID}</div>
                <div className="col-lg-1">{upload.Type}</div>
                <div className="col-lg-1">{upload.ReturnZipName}</div>
                <div className="col-lg-1"></div>
                <div className="col-lg-1">
                    <Link
                        to={`/clients/${clientid}/jobs/${jobid}/returns/${upload.ID}`}
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

export default ReturnList
