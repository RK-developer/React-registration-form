import {useState, useEffect} from "react";
import {notAllowedFirstCharAsSpecial, isEmptyCheck, isEmailCheck} from "../utils/formValidations/validation";
const useCustomFields = props => {
    const {onChange, value:currentValue, validation, isReset} = props;
    const hasValidation = validation && Object.keys(validation).length > 0;
    const [filedCurrentVal, setFieldCurrentVal] = useState({});
    useEffect(() => {
        if(isReset) {
            setFieldCurrentVal({}); 
        }
    },[isReset])
    const onChangeHandler = (event) => {
        const value = notAllowedFirstCharAsSpecial(event.target.value);
        const targetValue = {
            value
        };

        if(hasValidation) {
            const _isEmpty = isEmptyCheck(value);
            targetValue.hasError = false;
            targetValue.hasEmailError = false;
            if(validation?.empty) {
                targetValue.hasError = _isEmpty;
            } 
            if(validation?.email && !_isEmpty) {
                targetValue.hasEmailError = !isEmailCheck(value);
            }
        }
        setFieldCurrentVal(preValue => ({...preValue,...targetValue}));
        onChange({...targetValue}, event);
    }

    const onFormatValue = () => {
        return notAllowedFirstCharAsSpecial(currentValue);
    }

    return[onChangeHandler, onFormatValue, filedCurrentVal, setFieldCurrentVal]
}

export default useCustomFields;