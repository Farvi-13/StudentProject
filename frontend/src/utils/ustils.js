import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(false);
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [inputValid, setInputValid] = useState(false)
    const [passwordCheckError, setPasswordCheckError] = useState(false)

    useEffect(() => {

        for (const validation in validations) {
            switch (validation) {
                case "minLength":
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break
                case "isEmpty":
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case "maxLength":
                    value.length > validations[validation]
                        ? setMaxLengthError(true)
                        : setMaxLengthError(false)
                    break
                case "isEmail":
                    String(value)
                        .toLowerCase()
                        .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                        ? setEmailError(false)
                        : setEmailError(true)
                    break
                case "isPhone":
                    String(value)
                        .toLowerCase()
                        .match(
                            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
                        ? setPhoneError(false)
                        : setPhoneError(true)
                    break
                case "passwordCheck":
                    String(value).match(validations[validation])
                        ? setPasswordCheckError(false)
                        : setPasswordCheckError(true)
            }
        }

    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError || maxLengthError || emailError || phoneError || passwordCheckError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [isEmpty, minLengthError, maxLengthError, emailError, phoneError, passwordCheckError])

    return {
        isEmpty, minLengthError, maxLengthError, emailError, phoneError, passwordCheckError, inputValid
    }
}

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)
    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBadResp = (value) => {
        setValue(value);
    }

    const onBlur = (e) => {
        setDirty(true);
    }

    return {
        value, onChange, onBlur, onBadResp, ...valid, isDirty
    }
}