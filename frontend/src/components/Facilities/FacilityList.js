import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { useFacilityContext } from '../../hooks/useFacilityContext'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined' //specs
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined' //rpt reqs
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined' //channels
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined' //logos

const FacilityList = ({ facility }) => {
    const [facilities, setFacilities] = useState(null)
    const { user } = useAuthContext()
    const { dispatch } = useFacilityContext()
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
                '/facilities/' +
                facility.ID,
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
                facility.Facility +
                    ' was deactivated'
            )
            setFacilities(json)
            //dispatch({type: 'SET_FACILITIES', payload: json})
        }
    }

    const generateRoute = (method) => {
        if (!user) {
            return
        }
        const url = `/facilities/${facility.ID}/${method}`
        return url
    }

    return (
        <div className="container-fluid">
            <div className="row data-row">
                <div className="col-lg-2">{facility.Facility}</div>
                <div className="col-lg-1">{facility.ID}</div>
                <div className="col-lg-1">{facility.Active}</div>
                <div className="col-lg-1">{facility.MinimumBalance.toString()}</div>
                <div className="col-lg-2">
                    {facility.InsuranceTransferLanguage}
                </div>
                <div className="col-lg-2">
                    {facility.PateientTransferLanguage}
                </div>
                <div className="col-lg-1">
                    <Link
                        to={`/clients/${clientid}/jobs/${jobid}/facilities/${facility.ID}/specs`}
                        state={{
                            clientid: clientid,
                            jobid: jobid,
                            facilityid: facility.ID,
                        }}
                    >
                        <IconButton>
                            <TuneOutlinedIcon className="modify-details-icon" />
                        </IconButton>
                    </Link>
                </div>
                <div className="col-lg-1">
                    <Link
                        to={`/clients/${clientid}/jobs/${jobid}/facilities/${facility.ID}`}
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

export default FacilityList
