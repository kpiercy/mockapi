import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useProcessContext } from '../../hooks/useProcessContext'

const ProcessList = ({ process }) => {
    const [processes, setProcesses] = useState(null)
    const { user } = useAuthContext()
    const { dispatch } = useProcessContext()
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
                '/processes/' +
                process.ID,
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
                'Process: ' + process.ID + ' was deactivated'
            )
            setProcesses(json)
            //dispatch({type: 'SET_CONTACTS', payload: json})
        }
    }

    const generateRoute = (method) => {
        if (!user) {
            return
        }
        const url = `/processes/${process.ID}/${method}`
        return url
    }

    return (
        <div className="data-cards">
            <h4>{process.LocalDirectory}</h4>
            <p>
                <strong>ID: </strong>
                {process.ID}
            </p>
            <p>
                <strong>ArchiveDirectory: </strong>
                {process.ArchiveDirectory}
            </p>
            <p>
                <strong>Wait: </strong>
                {process.Wait}
            </p>
            <p>
                <strong>ParseMessage: </strong>
                {process.ParseMessage}
            </p>
            <p>
                <strong>PrintMessage: </strong>
                {process.PrintMessage}
            </p>
            <p>
                <strong>MasterEnabled: </strong>
                {process.MasterEnabled.toString()}
            </p>
            <p>
                <strong>GAReady: </strong>
                {process.GAReady.toString()}
            </p>
            <p>
                <strong>TimeBased: </strong>
                {process.TimeBased.toString()}
            </p>
            <p>
                <strong>TimeRan: </strong>
                {process.TimeRan}
            </p>
            <p>
                <strong>DaysProcessed: </strong>
                {process.DaysProcessed}
            </p>
            <p>
                <strong>ReadyForProcessing: </strong>
                {process.ReadyForProcessing.toString()}
            </p>
            <p>
                <strong>ErrorsBypassed: </strong>
                {process.ErrorsBypassed.toString()}
            </p>
            <p>
                <strong>ReqUnzip: </strong>
                {process.ReqUnzip.toString()}
            </p>
            <p>
                <strong>PresortPageNum: </strong>
                {process.PresortPageNum}
            </p>
            <p>
                <strong>FilesReqd: </strong>
                {process.FilesReqdForProcessing}
            </p>
            <p>
                <strong>ChainJob: </strong>
                {process.ChainJob.toString()}
            </p>
            <p>
                <strong>RunOncePerDay: </strong>
                {process.RunOncePerDay.toString()}
            </p>
            <p>
                <strong>RanToday: </strong>
                {process.RanToday.toString()}
            </p>
            {/* <Link to={`/clients/${clientid}/processes/${process.ID}`}>
                <IconButton>
                    <SearchOutlined className="modify-details-icon" />
                </IconButton>
            </Link> */}
            <Link to={generateRoute('update')}>
                <IconButton>
                    <EditIcon className="modify-details-icon" />
                </IconButton>
            </Link>
            <IconButton onClick={handleDelete}>
                <DeleteIcon className="modify-details-icon" />
            </IconButton>
            {/* <span className="material-symbols-outlined" onClick={handleClick}>
                delete
                </span> */}
        </div>

        // <div className="container-fluid">
        //     <div className="row data-row">
        //         <div className="col">{process.LocalDirectory}</div>
        //         <div className="col">{process.ID}</div>
        //         <div className="col">{process.ArchiveDirectory}</div>
        //         <div className="col">{process.Wait}</div>
        //         <div className="col">{process.MasterEnabled}</div>
        //         <div className="col">{process.GAReady}</div>
        //         <div className="col">{process.TimeBased}</div>
        //         <div className="col">{process.TimeRan}</div>
        //         <div className="col">{process.DaysProcessed}</div>
        //         <div className="col">{process.ReadyForProcessing}</div>
        //         <div className="col">{process.ErrorsBypassed}</div>
        //         <div className="col">{process.ReqUnzip}</div>
        //         <div className="col">{process.ChainJob}</div>
        //         <div className="col">{process.RunOncePerDay}</div>
        //         <div className="col">{process.RanToday}</div>
        //         <div className="col">
        //             <Link to={`/clients/${clientid}/processes/${process.ID}`}>
        //                 <IconButton>
        //                     <SearchOutlined className="modify-details-icon" />
        //                 </IconButton>
        //             </Link>
        //             <Link to={generateRoute('update')}>
        //                 <IconButton>
        //                     <EditIcon className="modify-details-icon" />
        //                 </IconButton>
        //             </Link>
        //             <IconButton onClick={handleDelete}>
        //                 <DeleteIcon className="modify-details-icon" />
        //             </IconButton>
        //         </div>
        //     </div>
        // </div>
    )
}

export default ProcessList
