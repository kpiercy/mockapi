import { Box, Button, TextField } from '@mui/material'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../ui/global/Header'
import { useAuthContext } from '../../hooks/useAuthContext'

// import { Clients } from '../../../../schemas/clients'
// const clientSchema = { Clients }

const clientSchema = yup.object().shape({
    Clients: yup.array().of(
        yup.object().shape({
            ParentID: yup.string().uuid(),
            Name: yup.string().trim().required('ClientName is a required field.'),
            Active: yup.boolean().required().default(false),
            ERPID: yup.number().integer().default(0),
            ERPParentID: yup.number().integer().default(0),
            ERPCode: yup.string().trim().default('0'),
            ERPSvcsCode: yup.string().trim().default('0'),
            ERPPostageCode: yup.string().trim().default('0'),
            Type: yup.string()
                .oneOf(['DirectClient', 'ChannelPartner', 'NonProfit', 'AdHoc'])
                .default('DirectClient')
                .required('Please enter DirectClient, ChannelPartner, NonProfit or AdHoc'),
            Term: yup.string()
                .oneOf(['NET10', 'NET30', 'NET60', 'NET90'])
                .default('NET30')
                .required('Please enter NET10, NET30, NET60, or NET90.'),
            PostageCost: yup.number().default(0.497),
            PostagePrice: yup.number().default(0.510),
            AllInOneInvoicing: yup.boolean().default(false),
            ZeroSellHiding: yup.boolean().default(true),
            BulkBillEnabled: yup.boolean().default(false)
        })
    )
});

const initialValues = {
    Parent_GUID: "",
    ClientName: "",
    Active: false,
    ErpID: 0,
    ErpParentID: 0,
    ErpCode: "0",
    ErpSvcCode: "0",
    ErpPostageCode: "0",
    Type: "DirectClient",
    Term: "NET30",
    PostageCost: 0.481,
    PostagePrice: 0.510,
    AllInOneInvoicing: false,
    ZeroSellHiding: true,
    BulkBillEnabled: false,
}

const AddClientForm = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)')
    const { user } = useAuthContext()

    const postData = async(query)=>{
        let res = await fetch("http://localhost:5000/api/v1/clients", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
        },
            body: query,
        })
            if (res.ok) {
                let data = await res.json()
                alert(res.status)
                console.log(data)
                //dispatch({type: 'SET_JOBS', payload: json})
            } else {
                alert(res.status)
            }
        }


    return (
        <Box m='20px'>
            <Header title='Create Client' subtitle='Create a new client.' />

            <Formik
                onSubmit={ async (values) => {
                    let query = JSON.stringify({ 
                        Clients: [ {...values} ] 
                    });
                    postData(query);
                }}
                initialValues={initialValues}
                validationSchema={clientSchema}
            >
                {({ values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Box 
                            display='grid' 
                            gap='30px' 
                            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                            sx={{
                                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                            }}
                        >
                            <TextField 
                                fullWidth
                                variant='filled'
                                type='text'
                                label='ParentID'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ParentID}
                                name='ParentID'
                               errors={!!touched.ParentID && !!errors.ParentID}
                                helpertext={touched.ParentID && errors.ParentID}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            {errors.ParentID && 
                            touched.ParentID 
                            && <p className={"error"}>{errors.ParentID}</p>}
                            <TextField 
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Name'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Name}
                                name='Name'
                               errors={!!touched.Name && !!errors.Name}
                                helpertext={touched.Name && errors.Name}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            {errors.Name && 
                            touched.Name 
                            && <p className={"error"}>{errors.Name}</p>}
                            <TextField 
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Username'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Username}
                                name='Username'
                               errors={!!touched.Username && !!errors.Username}
                                helpertext={touched.Username && errors.Username}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <TextField 
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Password'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Password}
                                name='Password'
                               errors={!!touched.Password && !!errors.Password}
                                helpertext={touched.Password && errors.Password}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <Field 
                                component='select'
                                id='permissionlvl'
                                multiple={false}
                                fullWidth
                                variant='filled'
                                label='PermissionLvl'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.PermissionLvl}
                                name='PermissionLvl'
                               errors={!!touched.PermissionLvl && !!errors.PermissionLvl}
                                helpertext={touched.PermissionLvl && errors.PermissionLvl}
                                sx={{ gridColumn: 'span 4' }}
                            >
                                <option value="" label='Permission Level'>
                                    Select a permission level{" "}
                                </option>
                                <option value='94dbbb6d-1e17-4769-9ebe-ddfe745cd01f' label='Standard'>
                                    {" "}
                                    Standard
                                </option>
                                <option value='20b746a8-dd10-4a5b-8902-71b1d3874336' label='Parent'>
                                    {" "}
                                    Parent
                                </option>
                            </Field>
                            <Field 
                                component='select'
                                id='apiaccess'
                                multiple={false}
                                fullWidth
                                variant='filled'
                                type='text'
                                label='APIAccess'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.APIAccess}
                                name='APIAccess'
                               errors={!!touched.ApiAccess && !!errors.ApiAccess}
                                helpertext={touched.ApiAccess && errors.ApiAccess}
                                sx={{ gridColumn: 'span 2' }}
                            >
                                <option value="" label='Set Active'>
                                    Select Active status for the user{" "}
                                </option>
                                <option value={false} label='False'>
                                    False{" "}
                                </option>
                                <option value={true} label='True'>
                                    {" "}
                                    True
                                </option>
                            </Field>
                            <TextField 
                                fullWidth
                                variant='filled'
                                type='text'
                                label='AllowableIP'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.AllowableIP}
                                name='AllowableIP'
                               errors={!!touched.AllowableIP && !!errors.AllowableIP}
                                helpertext={touched.AllowableIP && errors.AllowableIP}
                                sx={{ gridColumn: 'span 2' }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting} >
                                Create New Client
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default AddClientForm;