import { Box, Button, TextField } from '@mui/material'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../ui/global/Header'
import { useAuthContext } from '../../hooks/useAuthContext'

const userSchema = 
    yup.object().shape({
      Client_GUID: yup.string().uuid().required('Client_GUID is required'),
      Email: yup.string().trim().email().required('Email is required'),
      Username: yup.string().trim().lowercase().required('Username is required'),
      Password: yup.string().min(16).required('Password is required'),
      PermissionLvl: yup.string().uuid().required('Must choose a PermissionLvl'),
      ApiAccess: yup.boolean().default(false).required('Required'),
      AllowableIP: yup.string().trim().required('AllowableIP is required')
    })

const initialValues = {
    Client_GUID: "",
    Email: "",
    Username: "",
    Password: "",
    PermissionLvl: "",
    ApiAccess: false,
    AllowableIP: ""
}

const AddUserForm = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)')
    const { user } = useAuthContext()

    const postData = async(query)=>{
        let res = await fetch("http://localhost:4000/api/v1/clients/users", {
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
            <Header title='Create User' subtitle='Create a new user for the specified Client_GUID' />

            <Formik
                onSubmit={ async (values) => {
                    let query = JSON.stringify({ 
                        Users: [ {...values} ] 
                    });
                    postData(query);
                }}
                initialValues={initialValues}
                validationSchema={userSchema}
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
                                label='Client_GUID'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Client_GUID}
                                name='Client_GUID'
                               errors={!!touched.Client_GUID && !!errors.Client_GUID}
                                helpertext={touched.Client_GUID && errors.Client_GUID}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            <TextField 
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Email'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Email}
                                name='Email'
                               errors={!!touched.Email && !!errors.Email}
                                helpertext={touched.Email && errors.Email}
                                sx={{ gridColumn: 'span 2' }}
                            />
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
                                Create New User
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default AddUserForm;