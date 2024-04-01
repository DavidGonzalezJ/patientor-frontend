import { useState, useEffect, ChangeEvent } from "react";
import { EntryType, EntryWithoutId, HealthCheckRating } from "../../types";
import { Select, MenuItem, SelectChangeEvent, FormControl,
    InputLabel, OutlinedInput, Box, Chip, Button, Input } from '@mui/material';
import diagnosisService from "../../services/diagnosis";
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const HospitalEntryForm = ({codeList, submit}: {codeList:string[], submit: (id:string, entry:EntryWithoutId)=> void}) => {
    const [ codes, setCodes ] = useState<string[]>([]);
    const [ description, setDescription ] = useState<string>('');
    const [ date , setDate ] = useState<string>('');
    const [ specialist, setSpecialist ] = useState<string>('');
    const [ dischargeDate, setDischargeDate] = useState<string>('');
    const [ dischargeCriteria, setDischargeCriteria] = useState<string>('');

    const  id  = useParams().id || "";

    const handleCodeChange = (event: SelectChangeEvent<typeof codes>) => {
        const {
          target: { value },
        } = event;
        setCodes(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSpecialistChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSpecialist(event.target.value);
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleDischargeCriteriaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDischargeCriteria(event.target.value);
    };

    const handleDischargeDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDischargeDate(event.target.value);
    };

    const handleDeleteCodes = () => {
        setCodes([]);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newEntry: EntryWithoutId = {
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: codes,
            type: EntryType.Hospital,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
            }
        };
        submit(id, newEntry);

        setCodes([]);
        setDate('');
        setDescription('');
        setDischargeCriteria('');
        setDischargeDate('');
        setSpecialist('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-code-label">Codes</InputLabel>
            <Select
              labelId="multiple-code-label"
              id="multiple-code"
              multiple
              value={codes}
              onChange={handleCodeChange}
              input={<OutlinedInput id="select-multiple-code" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {codeList.map((code) => (
                <MenuItem
                  key={code}
                  value={code}
                >
                  {code}
                </MenuItem>
              ))}
            </Select>
            <Button onClick={handleDeleteCodes} variant="outlined" startIcon={<DeleteIcon />}>
                Delete
            </Button>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
            
            <Input placeholder="description" value={description} onChange={handleDescriptionChange}></Input>
            </FormControl>
            
            <FormControl sx={{ m: 1, width: 300 }}>
            <Input placeholder="specialist" value={specialist} onChange={handleSpecialistChange}></Input>
            </FormControl>
            
            <FormControl sx={{ m: 1, width: 300 }}>
            <Input type="date" placeholder="date" value={date} onChange={handleDateChange}></Input>
            </FormControl>
            
            <div>
              <InputLabel id="discharge-label">Discharges</InputLabel>
                <FormControl sx={{ m: 1, width: 300 }}>
                <Input sx={{marginLeft: '20px'}} type="date" placeholder="Date" value={dischargeDate} onChange={handleDischargeDateChange}/>
                </FormControl>
                <FormControl  sx={{ m: 1, width: 300 }}>
                <Input sx={{marginLeft: '20px'}} placeholder="Criteria" value={dischargeCriteria} onChange={handleDischargeCriteriaChange}/>
                </FormControl>
            </div>
            <br />
            <Button type="submit">Submit</Button>
        </form>
      );


};

const OccupationalHealthcareForm = ({codeList, submit}: {codeList:string[], submit: (id:string, entry:EntryWithoutId)=> void}) => {
  const [ codes, setCodes ] = useState<string[]>([]);
  const [ description, setDescription ] = useState<string>('');
  const [ employerName, setEmployerName ] = useState<string>('');
  const [ date , setDate ] = useState<string>('');
  const [ specialist, setSpecialist ] = useState<string>('');
  const [ startDate, setstartDate ] = useState<string>('');
  const [ endDate , setEndDate ] = useState<string>('');

  const  id  = useParams().id || "";

  const handleCodeChange = (event: SelectChangeEvent<typeof codes>) => {
      const {
        target: { value },
      } = event;
      setCodes(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
  };

  const handleSpecialistChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSpecialist(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDate(event.target.value);
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      setstartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      setEndDate(event.target.value);
  };

  const handleEmployerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmployerName(event.target.value);
  };

  const handleDeleteCodes = () => {
      setCodes([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newEntry: EntryWithoutId = {
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: codes,
          type: EntryType.OccupationalHealthcare,
          sickLeave: {
              startDate: startDate,
              endDate: endDate
          },
          employerName: employerName
      };
      submit(id, newEntry);

      setCodes([]);
      setDate('');
      setDescription('');
      setEmployerName('');
      setstartDate('');
      setEndDate('');
      setSpecialist('');
  };

  return (
      <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="multiple-code-label">Codes</InputLabel>
          <Select
            labelId="multiple-code-label"
            id="multiple-code"
            multiple
            value={codes}
            onChange={handleCodeChange}
            input={<OutlinedInput id="select-multiple-code" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {codeList.map((code) => (
              <MenuItem
                key={code}
                value={code}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleDeleteCodes} variant="outlined" startIcon={<DeleteIcon />}>
              Delete
          </Button>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
          
          <Input placeholder="description" value={description} onChange={handleDescriptionChange}></Input>
          </FormControl>
          
          <FormControl sx={{ m: 1, width: 300 }}>
          <Input placeholder="specialist" value={specialist} onChange={handleSpecialistChange}></Input>
          </FormControl>

          <FormControl sx={{ m: 1, width: 300 }}>
          <Input placeholder="employer name" value={employerName} onChange={handleEmployerNameChange}></Input>
          </FormControl>
          
          <FormControl sx={{ m: 1, width: 300 }}>
          <Input type="date" placeholder="date" value={date} onChange={handleDateChange}></Input>
          </FormControl>
          
          <div>
            <InputLabel id="discharge-label">Sick leave</InputLabel>
              <FormControl sx={{ m: 1, width: 300 }}>
              From
              <Input sx={{marginLeft: '20px'}} type="date" placeholder="startDate" value={startDate} onChange={handleStartDateChange}/>
              </FormControl>
              <FormControl  sx={{ m: 1, width: 300 }}>
              To
              <Input sx={{marginLeft: '20px'}} type="date" placeholder="endDate" value={endDate} onChange={handleEndDateChange}/>
              </FormControl>
          </div>
          <br />
          <Button type="submit">Submit</Button>
      </form>
    );
};

const HealthCheckForm = ({codeList, submit}: {codeList:string[], submit: (id:string, entry:EntryWithoutId)=> void})  => {
  const [ codes, setCodes ] = useState<string[]>([]);
  const [ description, setDescription ] = useState<string>('');
  const [ date , setDate ] = useState<string>('');
  const [ specialist, setSpecialist ] = useState<string>('');
  const [ healthRating, setHealthRating ] = useState<number>(0);

  const  id  = useParams().id || "";

  const handleCodeChange = (event: SelectChangeEvent<typeof codes>) => {
      const {
        target: { value },
      } = event;
      setCodes(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
  };

  const handleSpecialistChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSpecialist(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDate(event.target.value);
  };

  const handleHealthRatingChange = (event: SelectChangeEvent<number>) => {
    setHealthRating(event.target.value as HealthCheckRating);
  };

  const handleDeleteCodes = () => {
      setCodes([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newEntry: EntryWithoutId = {
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: codes,
          type: EntryType.HealthCheck,
          healthCheckRating: healthRating
          
      };
      submit(id, newEntry);

      setCodes([]);
      setDate('');
      setDescription('');
      setHealthRating(0);
      setSpecialist('');
  };

  return (
      <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="multiple-code-label">Codes</InputLabel>
          <Select
            labelId="multiple-code-label"
            id="multiple-code"
            multiple
            value={codes}
            onChange={handleCodeChange}
            input={<OutlinedInput id="select-multiple-code" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {codeList.map((code) => (
              <MenuItem
                key={code}
                value={code}
              >
                {code}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleDeleteCodes} variant="outlined" startIcon={<DeleteIcon />}>
              Delete
          </Button>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
          
          <Input placeholder="description" value={description} onChange={handleDescriptionChange}></Input>
          </FormControl>
          
          <FormControl sx={{ m: 1, width: 300 }}>
          <Input placeholder="specialist" value={specialist} onChange={handleSpecialistChange}></Input>
          </FormControl>
          
          <FormControl sx={{ m: 1, width: 300 }}>
          <Input type="date" placeholder="date" value={date} onChange={handleDateChange}></Input>
          </FormControl>
          
          <div>
              <InputLabel>Health state</InputLabel>
              <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                id="single-select"
                value={healthRating}
                onChange={handleHealthRatingChange}
            >
                <MenuItem value={0}>Healthy</MenuItem>
                <MenuItem value={1}>Low risk</MenuItem>
                <MenuItem value={2}>High risk</MenuItem>
                <MenuItem value={3}>Critical risk</MenuItem>
            </Select>
              </FormControl>
          </div>
          <br />
          <Button type="submit">Submit</Button>
      </form>
    );
};

const NewEntryForm = ({handleNewEntry}:{handleNewEntry:(id:string, entry:EntryWithoutId)=>void}) => {
    const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
    const [ diagnoseCodes, setDiagnoseCodes ] = useState<string[]>([]);

    useEffect(()=>{
        diagnosisService.getAll()
            .then(diagnoses => {
                setDiagnoseCodes(diagnoses.map(d => d.code));
            });
    },[]);

    const handleChange = (event: SelectChangeEvent<EntryType>) => {
        setEntryType(event.target.value as EntryType);
    };

    return (
        <div style={ {border: '1px dashed black', padding: '20px', marginTop: '20px'}}>
            <h3>New entry</h3>
            <InputLabel>Entry type</InputLabel>
            <Select
                id="single-select"
                value={entryType}
                onChange={handleChange}
            >
                <MenuItem value="HealthCheck">Health check</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
                <MenuItem value="OccupationalHealthcare">Occupational healthcare</MenuItem>
            </Select>
            {entryType === EntryType.Hospital && <HospitalEntryForm codeList={diagnoseCodes} submit={handleNewEntry}/>}
            {entryType === EntryType.HealthCheck && <HealthCheckForm codeList={diagnoseCodes} submit={handleNewEntry}/>}
            {entryType === EntryType.OccupationalHealthcare && <OccupationalHealthcareForm codeList={diagnoseCodes} submit={handleNewEntry}/>}
        </div>
    );
};

export default NewEntryForm;