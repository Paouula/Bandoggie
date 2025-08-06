import React from 'react';
import "./TextArea.css"; 
import { TextareaAutosize } from '@mui/material';

const TextAreaComponent = ({
  id,
  placeholder,
  register = {},
  className = "",
  maxLength = 235, 
  ...props
}) => {
  return (
    <div className="text-area-group">
      <TextareaAutosize
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`custom-textarea ${className}`}
        {...register}
        {...props}
      />
    </div>
  );
};

export default TextAreaComponent;
