import React, { useState } from 'react';
import PropTypes from 'prop-types';

FormAction.propTypes = {
    onSubmitForm: PropTypes.func,

};

FormAction.defatultProps = {
    onSubmitForm: null
}

function FormAction(props) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(false);
    const [gender, setGender] = useState(1);
    const [language, setLanguage] = useState('en');
    const { onSubmitForm } = props;

    function handleNameChange(e) {
        // setName(e.target.value)
        setName(e.target.value);
    }
    function handleStatusChange(e) {
        // setName(e.target.value)
        setStatus(e.target.checked);
    }
    function handleGenderChange(e) {
        // setName(e.target.value)
        setGender(e.target.value);
    }
    function handleLanguageChange(e) {
        // setName(e.target.value)
        setLanguage(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!onSubmitForm) return;
        const formValues = {
            name: name,
            status: status,
            gender: gender,
            language: language,

        }
        onSubmitForm(formValues)
    }

    return (

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                onChange={handleNameChange}
            />
            <input
                type="checkbox"
                onChange={handleStatusChange}
                value={status}
                checked={status === true}
            />

            <select
                className="form-control"
                value={gender}
                onChange={handleGenderChange}
            >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
            </select>
            <p>
                <input
                    type="radio"
                    checked={language === 'vi'}
                    value='vi'
                    onChange={handleLanguageChange}
                />
                VietNamese
            </p>
            <p>
                <input
                    type="radio"
                    checked={language === 'en'}
                    value='en'
                    onChange={handleLanguageChange}
                />
                English
            </p>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    );
}

export default FormAction;