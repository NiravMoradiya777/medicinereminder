import * as React from 'react';
import axios from 'axios';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../theme/components/Title';
import dayjs from 'dayjs';

export default function Medications() {
  const [id, setId] = React.useState('');
  const [medicationData, setMedicationData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setId(JSON.parse(localStorage.getItem('user')).userId);
      await getMedicationData();
    };
    fetchData();
    PageIntroduction();
  }, [])

let isPageIntroductionCalled = false;

const PageIntroduction = () => {
  if(medicationData[0]) {
    localStorage.setItem('nextMedicationName', medicationData[0].name)
    localStorage.setItem('nextMedicationTime', medicationData[0].time_to_take)
  }
  if (!isPageIntroductionCalled && localStorage.getItem("switchState") === "true") {
    const text = "Please take " + localStorage.getItem("nextMedicationName") + " at " + localStorage.getItem("nextMedicationTime");
    const value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
    isPageIntroductionCalled = true;
  }
};

  const getMedicationData = React.useCallback(() => {
    axios.get(process.env.REACT_APP_API_BASE_URL+'medicinereminder/patient/medicines/getMedicinesByUserId', {params: {userId: JSON.parse(localStorage.getItem("user")).userId}}).then((response) => {
        setMedicationData(response.data.medicinesData);
    }).catch((error) => {
      console.error('Error fetching medication:',error);
    })
  }, []);

  return (
    <React.Fragment>
      <Title>Medications List</Title>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Dosage</TableCell>
                            <TableCell>Frequency</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Time to take</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                            {medicationData.map((row) => (
                                <TableRow
                                key={row.medicineId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.dosage}</TableCell>
                                    <TableCell>{row.frequency == 1 ? 'Once a day' : (row.frequency == 2 ? 'Twice a day' : 'As needed') }</TableCell>
                                    <TableCell>{dayjs(row.start_date).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{dayjs(row.end_date).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{row.time_to_take}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                    </Table>
    </React.Fragment>
  );
}
