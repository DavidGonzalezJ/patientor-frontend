import { useState, useEffect } from "react";
import { EntryWithoutId, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import EntryDeatils from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";

const PatientDeatils = ({handleNewEntry}:{handleNewEntry:(id:string, entry:EntryWithoutId)=>void}) => {
    const [patient, setPatient] = useState<Patient>();
    const  id  = useParams().id || "";

    useEffect(()=>{
        patientService.getById(id)
            .then(res => {
                setPatient(res);
            });
    }, []);

    const handleNewEntryAndRefresh = (id:string, entry:EntryWithoutId) => {
        handleNewEntry(id,entry);
        patientService.getById(id)
            .then(res => setPatient(res));
    };
    
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
                <NewEntryForm handleNewEntry={handleNewEntryAndRefresh}/>
            </>
        );

    return null;
};

export default PatientDeatils;