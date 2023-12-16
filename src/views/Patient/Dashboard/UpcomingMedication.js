import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Title from '../../../theme/components/Title';
import Link from '@mui/material/Link';

export default function UpcomingMedication() {
  const theme = useTheme();
  const [id, setId] = React.useState('');
  const [upcomingMedicationData, setUpcomingMedicationData] = React.useState([]);

  React.useEffect(() => {
    setId(JSON.parse(localStorage.getItem('user')).userId);
    getUpcomingMedicationData();
}, [])

  const getUpcomingMedicationData = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL+'medicinereminder/patient/dashboard/getUpcomingMedication?patientId=' + JSON.parse(localStorage.getItem("user")).userId).then((response) => {
      setUpcomingMedicationData(response.data.upcomingMedications);
    }).catch((error) => {
      console.error('Error fetching medication list:',error);
    })
  }

  function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}

  return (
    <React.Fragment>
      <Title>Next Medication</Title>
      <Typography component="p" variant="h4">
        {upcomingMedicationData.name}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Period ({formatDate(upcomingMedicationData.start_date)} - {formatDate(upcomingMedicationData.end_date)})
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        At {upcomingMedicationData.time_to_take}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Dose {upcomingMedicationData.dosage}
      </Typography>
    </React.Fragment>
  );
}
