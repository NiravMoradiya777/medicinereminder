import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../theme/components/Title';

export default function UpcomingMedication() {
    const [id, setId] = React.useState('');
  const [patientMedication, setPatientMedication] = React.useState([]);

  React.useEffect(() => {
    setId(JSON.parse(localStorage.getItem('user')).userId);
    getPatientMedicationData();
  }, [])

  const getPatientMedicationData = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL+'medicinereminder/caregiver/dashboard/findCaregiverPatientDetails?careGiverId=' + JSON.parse(localStorage.getItem("user")).userId).then((response) => {
      setPatientMedication(response.data.caregiverDashboard.patients);
    }).catch((error) => {
      alert('An error occurred!');
      console.log(error);
    })
  }

  return (
    <React.Fragment>
      <Title>Medications List</Title>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Medication Name</TableCell>
            <TableCell>Medication Dosage</TableCell>
            <TableCell>Medication Frequency</TableCell>
            <TableCell>Time to take medication</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {patientMedication.length === 0 && (<TableRow><TableCell colSpan={6}>no records found</TableCell></TableRow>)}
          {patientMedication.map((row) => (
            <TableRow
              key={row.medicineId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.upcomingMedications.map((subRow) => (
                <div>{subRow.name}</div>
              )) }</TableCell>
              <TableCell>{row.upcomingMedications.map((subRow) => (
                <div>{subRow.dosage}</div>
              )) }</TableCell>
              <TableCell>{row.upcomingMedications.map((subRow) => (
                <div>{subRow.frequency}</div>
              )) }</TableCell>
              <TableCell>{row.upcomingMedications.map((subRow) => (
                <div>{subRow.time_to_take}</div>
              )) }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
