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
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";

export default function Patient() {

    const [fname, setFirstName] = React.useState('');
    const [lname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [value, setValue] = React.useState('1');
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState('');
    const [patientId, setPatientId] = React.useState('');
    const [isMedicineDialogOpen, setIsMedicineDialogOpen] = React.useState(false);
    const [medicineDetails, setMedicineDetails] = React.useState([]);



    const handleClickOpen = (id) => {
        setPatientId(id);
        getCaregiverById(id);
        setOpen(true);
    };

    const getCaregiverById = (id) => {
        const editableObj = data.filter(obj => obj.patientId === id)[0]
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
        handleGetCareGiverList();

    };

    React.useEffect(() => {
        setId(JSON.parse(localStorage.getItem('user')).userId);
        getPatientListByUserId();
        PageIntroduction();
    }, [])

    const handleGetCareGiverList = () => {
        if (value === '1') {
            // Fetch caregiver list based on user ID
            getPatientList();
        } else {
            // Fetch caregiver list for adding caregivers
            getPatientListByUserId();
        }
    };

    const getPatientListByUserId = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).userId;
        await axios.get(process.env.REACT_APP_API_BASE_URL + 'medicinereminder/doctor/managepatient/getPatientByUserId', {
            params: { userId }
        })
            .then((response) => {
                setData(response.data.patientData);
            })
            .catch((error) => {
                console.error('Error fetching Patient list:', error);
            });
    };

    let isPageIntroductionCalled = false;

    const PageIntroduction = () => {
        if (!isPageIntroductionCalled && localStorage.getItem("switchState") === "true") {
            const text = "This is a Manage Patient page, where you can manage your Patient list";
            const value = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(value);
            isPageIntroductionCalled = true;
        }
    };

    const getPatientList = () => {
        const userId = JSON.parse(localStorage.getItem('user')).userId;
        axios.get(process.env.REACT_APP_API_BASE_URL + 'medicinereminder/doctor/managepatient/getPatientList',{
            params: { userId }
        })
            .then((response) => {
                setData(response.data); // Assuming the response contains an array of Patient data
            })
            .catch((error) => {
                console.error('Error fetching Patient list:', error);
            });
    }

    const handleUpdate = () => {
        let obj = {
            userId: id,
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            patientId: patientId
        }

        axios.post(process.env.REACT_APP_API_BASE_URL + 'medicinereminder/doctor/managepatient/updateCareTakerDetails', obj).then((response) => {
            let temp = data.filter(obj => obj.patientId != response.data.updatedCareTakerDetails.patientId);
            temp.push(response.data.updatedCareTakerDetails);
            setData(temp);
            handleClose();
            alert('Updated successfully!');
        }).catch((error) => {
            alert('An error occured!')
        })
    }

    const registerCareTaker = (patientId) => {
        let obj = {
            doctorId: id,
            patientId: patientId
        }
        axios.post(process.env.REACT_APP_API_BASE_URL + 'medicinereminder/doctor/managepatient/registerPatient', obj).then((response) => {
            if (response.data.patientRegister == false) {
                alert(response.data.message);
            } else {
                // data.push(obj);
                getPatientListByUserId();
                setValue("1");
            }

        }).catch((error) => {
            alert('An error occured!');
            console.log(error);
        })
    }

    const handleDelete = (patientId) => {
        let obj = {
            doctorId: id,
            patientId: patientId
        }
        if (window.confirm("Are you sure you want to delete?") == true) {
            axios.delete(process.env.REACT_APP_API_BASE_URL + `medicinereminder/doctor/managepatient/deletePatientByUserId?patientId=${obj.patientId}&doctorId=${obj.doctorId}`).then((response) => {
                setData(data.filter(obj => obj.userId != patientId));
                alert('Deleted successfully!');
            }).catch((error) => {
                alert('An error occured while deleting!');
            })
        }
    }

    // Function to open the medicine details dialog
    const handleOpenMedicineDialog = (patientId) => {
        setPatientId(patientId);
        // Fetch and set medicine details based on patientId
        setIsMedicineDialogOpen(true);
    };

    // Function to close the medicine details dialog
    const handleCloseMedicineDialog = () => {
        setIsMedicineDialogOpen(false);
        setMedicineDetails(null); // Reset medicine details when closing the dialog
    };

    // Function to fetch and set medicine details based on patientId
    const fetchMedicineDetails = (patientId) => {
        // fetch medicine details based on the patientId
        axios.get(process.env.REACT_APP_API_BASE_URL + 'medicinereminder/doctor/managepatient/getMedicinesByUserId', { params: { userId: JSON.parse(localStorage.getItem("user")).userId } })
            .then((response) => {
                console.log(response)
                medicineDetails(response.data.medicinesData);
            }).catch((error) => {
                console.error('Error fetching medication list:', error);
            })
    };
    const navigate = useNavigate();
    const handleManagePatientClick = (patientId) => {
        console.log("dfsdsdsdsfd");
        navigate("/doctor/patient/" + patientId+ "/medication/");
    };

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
                            onChange={(event) => { setFirstName(event.target.value) }}
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
                            onChange={(event) => { setLastName(event.target.value) }}
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
                            onChange={(event) => { setEmail(event.target.value) }}
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
                            onChange={(event) => { setPhone(event.target.value) }}
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
                    <TabList onChange={handleChange}>
                        <Tab label="Patient List" value="1" />
                        <Tab label="Add Patient" value="2" className='add-caregiver' />
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
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleUpdate} autoFocus>
                                Update
                            </Button>
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
                                        key={row.userId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.fname} {row.lname}
                                        </TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>
                                            <Stack spacing={2} direction="row">
                                                <IconButton onClick={() => {handleManagePatientClick(row.userId)}} sx={{ p: 0 }} color='inherit'>
                                                    <ManageAccountsIcon fontSize="medium" />
                                                </IconButton>
                                                <IconButton onClick={() => { handleDelete(row.userId) }} color="primary" aria-label="" component="label">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                {/* Medicine Details Dialog */}
                <Dialog open={isMedicineDialogOpen} onClose={handleCloseMedicineDialog}>
                    <DialogTitle>Medicine Details</DialogTitle>
                    <DialogContent>
                        {/* Display medicine details here using the medicineDetails state */}
                        {/* Example: <Typography>{medicineDetails?.someProperty}</Typography> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseMedicineDialog} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <TabPanel value="2">
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
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleUpdate} autoFocus>
                                Update
                            </Button>
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
                                            <IconButton onClick={() => { registerCareTaker(row.userId); }} color="primary" aria-label="upload picture" component="label">
                                                <AddCircle />
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