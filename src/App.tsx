import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, EntryWithoutId } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDeatils from "./components/PatientDetails";

const Notification = ({msg}:{msg:string}) => {
  if(!msg) return null;
  return (
    <div style={{
      border: '2px solid red',
      borderRadius: '10px',
      color: 'red',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      padding: '10px',
    }}>
      {msg}
    </div>
  );

};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const addNewEntry = (id:string, entry:EntryWithoutId) => {
    patientService.addEntry(id,entry)
    .then(_res => {
      patientService.getAll()
      .then(patients => setPatients(patients));
    })
    .catch(error => {
      setMessage(error.response.data);
      setTimeout(()=> setMessage(''), 3000);
    });
  };
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/:id" element={<PatientDeatils handleNewEntry={addNewEntry}/>} />
          </Routes>
          <Notification msg={message}/>
        </Container>
      </Router>
    </div>
  );
};

export default App;
