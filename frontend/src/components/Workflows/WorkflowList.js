import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useWorkflowContext } from '../../hooks/useWorkflowContext'

const WorkflowList = ({ workflow }) => {
    const [workflows, setWorkflows] = useState(null)
    const { user } = useAuthContext()
    const { dispatch } = useWorkflowContext()
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
                '/workflows/' +
                workflow.ID,
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
            alert('Workflow: ' + workflow.ID + ' was deactivated')
            setWorkflows(json)
            //dispatch({type: 'SET_CONTACTS', payload: json})
        }
    }

    const generateRoute = (method) => {
        if (!user) {
            return
        }
        const url = `/workflows/${workflow.ID}/${method}`
        return url
    }

    return (
        <div className="data-cards">
            <h4>{workflow.Design}</h4>
            <p>
                <strong>ID: </strong>
                {workflow.ID}
            </p>
            <p>
                <strong>AlacritiEnabled: </strong>
                {workflow.AlacritiEnabled.toString()}
            </p>
            <p>
                <strong>PaperlessEnabled: </strong>
                {workflow.PaperlessEnabled.toString()}
            </p>
            <p>
                <strong>PrintToPath: </strong>
                {workflow.PrintToPath}
            </p>
            <p>
                <strong>EstmtPDFPath: </strong>
                {workflow.EstmtPDFPath}
            </p>
            <p>
                <strong>UNCPath: </strong>
                {workflow.UNCPath}
            </p>
            <p>
                <strong>RunMode: </strong>
                {workflow.RunMode}
            </p>
            <p>
                <strong>SubprocessReqd: </strong>
                {workflow.SubprocessReqd.toString()}
            </p>
            <p>
                <strong>BatchSize: </strong>
                {workflow.BatchInSetsOf}
            </p>
            <p>
                <strong>PrintPDFReturnEnabled: </strong>
                {workflow.PrintPDFReturnEnabled.toString()}
            </p>
            <p>
                <strong>FacilityPDFReturnEnabled: </strong>
                {workflow.FacilityPDFReturnEnabled.toString()}
            </p>
            <p>
                <strong>TableUpdate: </strong>
                {workflow.TableUpdate.toString()}
            </p>
            <p>
                <strong>UseStoredProc: </strong>
                {workflow.UseStoredProc.toString()}
            </p>
            <p>
                <strong>DataSource: </strong>
                {workflow.DataSource}
            </p>
            <p>
                <strong>StoredProc: </strong>
                {workflow.StoredProc}
            </p>
            <p>
                <strong>TableName: </strong>
                {workflow.TableName}
            </p>
            {/* <p>
                <strong>Active : </strong>
                {workflow.Active.toString()}
            </p> */}
            {/* <Link to={`/clients/${clientid}/workflows/${workflow.ID}`}>
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
    )
}

export default WorkflowList
