import { useState, useEffect } from "react";
import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnosis";

const DiagnosisDetails = ({code}: {code:string}) => {
    const [diagnosis, setDiagnosis]= useState<Diagnosis>();

    useEffect(() => {
        diagnosisService.getByCode(code)
            .then(d => setDiagnosis(d));
    },[]);

    if(!diagnosis) return null;

    return <li>{diagnosis.code} {diagnosis.name}</li>;
};

export default DiagnosisDetails;