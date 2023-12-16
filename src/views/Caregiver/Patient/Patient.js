import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function Patient() {

    const [fname, setFirstName] = React.useState('');
    const [lname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [value, setValue] = React.useState('1');
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');
    const [userId, setUserId] = React.useState('');

    const handleClickOpen = (id) => {
        setUserId(id);
        getCaregiverById(id);
        setOpen(true);
    };

    const getCaregiverById = (id) => {
        console.log(data);
        const editableObj = data.filter(obj => obj.userId === id)[0]
        // axios.get(process.env.REACT_APP_API_BASE_URL+'get-caregiver/'+id).then((response) => {
            setFirstName(editableObj.fname);
            setLastName(editableObj.lname);
            setEmail(editableObj.email);
            setPhone(editableObj.phone);
        // })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Call the function to fetch the caregiver list based on the selected tab
        // handleGetCareGiverList();

    };

    React.useEffect(() => {
        setId(JSON.parse(localStorage.getItem('user')).userId);
        getPatientsByCaregiverId();
    }, [])

    // React.useEffect(() => {
    //     getPatientsByCaregiverId();
    // }, [id])
    
    const getPatientsByCaregiverId = async () => {
        const careGiverId = JSON.parse(localStorage.getItem('user')).userId;
        await axios.get(process.env.REACT_APP_API_BASE_URL + 'medicinereminder/caregiver/managepatient/getPatientsByCaregiverId', {
            params: { careGiverId }
        })
        .then((response) => {
            console.log(response.data);
            setData(response.data.patientData);
        })
        .catch((error) => {
            console.error('Error fetching patient list:', error);
        });
    };

    const handleDelete = (patientId) => {

        let obj = {
            patientId: patientId,
            careGiverId: id
        }
        console.log(obj);
        if (window.confirm("Are you sure you want to delete?") == true) {
            axios.delete(process.env.REACT_APP_API_BASE_URL+`medicinereminder/caregiver/managepatient/deletePatientsByCaregiverId?patientId=${obj.patientId}&careGiverId=${obj.careGiverId}`).then((response) => {
                setData(data.filter(obj => obj.userId != patientId));
                alert('Deleted successfully!');
            }).catch((error) => {
                alert('An error occured while deleting!');
            })
        }
    }

    const caregiverForm = (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        value={fname}
                        onChange={(event) => {setFirstName(event.target.value)}}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        value={lname}
                        onChange={(event) => {setLastName(event.target.value)}}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        value={email}
                        onChange={(event) => {setEmail(event.target.value)}}
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={phone}
                        onChange={(event) => {setPhone(event.target.value)}}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                    </Grid>
                    
                </Grid>
                </React.Fragment>
            </Box>
    )

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList >
                    <Tab label="Patient List" value="1" />
                    {/* <Tab label="Add Caregivers" value="2" className='add-caregiver'/> */}
                </TabList>
                </Box>
                <TabPanel value="1">
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Edit Medication Details"}
                    </DialogTitle>
                    <DialogContent>
                    {caregiverForm}
                    </DialogContent>
                    <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate} autoFocus>
                        Update
                    </Button> */}
                    </DialogActions>
                </Dialog>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                            {data.length === 0 && (<TableRow><TableCell colSpan={6}>no records found</TableCell></TableRow>)}
                            {data.map((row) => (
                                <TableRow
                                key={row.caretakerId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.fname} {row.lname}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>
                                {/* <IconButton onClick={() => {handleClickOpen(row.caretakerId);}} color="primary" aria-label="upload picture" component="label">
                                    <EditIcon />
                                </IconButton> */}
                                <IconButton onClick={() => {handleDelete(row.userId)}} color="primary" aria-label="" component="label">
                                    <DeleteIcon />
                                </IconButton>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                    </Table>
                    </TableContainer>
                </TabPanel>
            </TabContext>
        </Box>
    );
}