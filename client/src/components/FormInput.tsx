import React from 'react';
import { TextField } from '@mui/material';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ label, type, name, value, onChange }: FormInputProps) => {
  return (
    <div>
      <TextField label={label} type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default FormInput;
