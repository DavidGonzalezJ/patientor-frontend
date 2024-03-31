import { useState, useEffect } from "react";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import EntryDeatils from "./EntryDetails";

const PatientDeatils = () => {
    const [patient, setPatient] = useState<Patient>();
    const  id  = useParams().id || "";

    useEffect(()=>{
        patientService.getById(id)
            .then(res => {
                setPatient(res);
            });
    }, []);
    
    if(patient)
        return (
            <>
                <h2>{patient.name} ({patient.gender})</h2>
                <p>
                    ssh: {patient.ssn}<br/>
                    occupation: {patient.occupation}
                </p>
                <h3>Entries</h3>
                {patient.entries.map(entry => {
                    return <EntryDeatils key={entry.id} entry={entry}/>;
                })}
            </>
        );

    return null;
};

export default PatientDeatils;