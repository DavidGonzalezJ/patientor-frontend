import { Entry, EntryType, HospitalEntry, HealthCheckEntry,
    OccupationalHealthcareEntry } from "../../types";
import DiagnosisDetails from "./DiagnosisDetails";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealingIcon from '@mui/icons-material/Healing';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HospitalEntryComp = ({entry}: {entry: HospitalEntry}) => {
    return (
        <div style={{ border: '1px solid black', borderRadius: '5px', padding: '10px' }}>
            <p>{entry.date} <LocalHospitalIcon/></p>
            <p><i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes?.map(code => 
                    <DiagnosisDetails key={code} code={code}/>)}
            </ul>
            <p>Discharge: {entry.discharge.criteria} ({entry.discharge.date})</p>
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

const OccupationalHealthcareEntryComp = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    return (
        <div style={{ border: '1px solid black', borderRadius: '5px', padding: '10px' }}>
            <p>{entry.date} <HealingIcon/> <i>{entry.employerName}</i></p>
            <p><i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes?.map(code => 
                    <DiagnosisDetails key={code} code={code}/>)}
            </ul>
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

const HealthCheckEntryComp = ({entry}: {entry: HealthCheckEntry}) => {
    let sx = {color: 'green'};

    switch (entry.healthCheckRating) {
        case 1:
            sx = {color: 'yellow'};
            break;
        case 2:
            sx = {color: 'orange'};
            break;
        case 3:
            sx = {color: 'red'};
            break;
        default:
            break;
    }

    return (
        <div style={{ border: '1px solid black', borderRadius: '5px', padding: '10px' }}>
            <p>{entry.date} <MedicalInformationIcon/></p>
            <p><i>{entry.description}</i></p>
            <p><FavoriteIcon sx={sx}/></p>
            <ul>
                {entry.diagnosisCodes?.map(code => 
                    <DiagnosisDetails key={code} code={code}/>)}
            </ul>
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

const EntryDeatils: React.FC<{entry: Entry}> = ({entry}: {entry:Entry}) => {

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch (entry.type) {
        case EntryType.Hospital:
            return <HospitalEntryComp entry={entry}/>;
        case EntryType.OccupationalHealthcare:
            return <OccupationalHealthcareEntryComp entry={entry}/>;
        case EntryType.HealthCheck:
            return <HealthCheckEntryComp entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDeatils;