import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({label, text, type, id, value, handleChange, checked}) => (
    <div className="form-group">
    <label htmlFor={label}>{text}</label>
        <input
            type = {type}
            className = "form-control"
            id = {id}
            value = {value}
            onChange = {handleChange}
            checked = {checked}
            required
        />
    </div>
);

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired
};

export default Checkbox;