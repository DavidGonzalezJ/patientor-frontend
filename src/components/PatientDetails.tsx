import { useState, useEffect } from "react";
import { Patient, Diagnosis } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnosis";

const DiagnosisDetails = ({code}: {code:string}) => {
    const [diagnosis, setDiagnosis]= useState<Diagnosis>();

    useEffect(() => {
        diagnosisService.getByCode(code)
            .then(d => setDiagnosis(d));
    },[]);

    if(!diagnosis) return null;

    return <li>{diagnosis.code} {diagnosis.name}</li>;
};

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
                    return (
                        <div key={entry.id}>
                            <p>{entry.date} <i>{entry.description}</i></p>
                            <ul key={entry.id}>
                                {entry.diagnosisCodes?.map(code =>
                                    <DiagnosisDetails key={code} code={code}/>)}
                            </ul>
                        </div>
                    );
                })}
            </>
        );

    return null;
};

export default PatientDeatils;