import React from 'react';
import cl from "./MySelect.module.css"

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            required="required"
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option value="" disabled>{defaultValue}</option>
            {options.map(
                option => <option key={option} value={option}>{option}</option>
            )}
        </select>
    );
};

export default MySelect;