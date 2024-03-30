import { useState, useEffect } from "react";
import { Patient } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";

const PatientDeatils = () => {
    const [patient, setPatient] = useState<Patient>();
    const  id  = useParams().id || "";

    useEffect(()=>{
        patientService.getById(id)
            .then(res => setPatient(res));
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
                    return (
                        <div key={entry.id}>
                            <p>{entry.date} <i>{entry.description}</i></p>
                            <ul key={entry.id}>
                                {entry.diagnosisCodes?.map(code =>
                                    <li key={code}>{code}</li>)}
                            </ul>
                        </div>
                    );
                })}
            </>
        );

    return null;
};

export default PatientDeatils;