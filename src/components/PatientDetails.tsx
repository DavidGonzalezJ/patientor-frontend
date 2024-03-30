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
                <h3>{patient?.name} ({patient?.gender})</h3>
                <p>
                    ssh: {patient?.ssn}<br/>
                    occupation: {patient?.occupation}
                </p>
            </>
        );

    return null;
};

export default PatientDeatils;