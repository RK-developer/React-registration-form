import React from "react";
import useCustomFields from "../../customHooks/useCustomFields";
const enterText = "Enter the Value";

const ErrorWrapper = ({
    validation,
    filedCurrentVal
}) => {
    return(
        <div className="error-wrapper">
            {
                validation?.empty
                &&
                filedCurrentVal?.hasError
                &&
                <p>{validation?.empty?.message}</p>
            }
            {
                validation?.email
                &&
                filedCurrentVal?.hasEmailError
                &&
                <p>{validation?.email?.message}</p>
            }
            </div>
    )
}

export const CustomInput = ({
    type = "text",
    value = "",
    placeholder = enterText,
    label = "custom-input",
    name = "custom-input",
    validation = {},
    onChange = () => {},
    ...props
}) => {
    const [onChangeHandler,onFormatValue,filedCurrentVal] = useCustomFields({onChange,value,validation})
    return (
        <div className="form-field-group mb-3">
            {label && <label htmlFor="custom-input" className="form-label">{label}</label>}
            <input 
            type={type} 
            value={onFormatValue()} 
            name={name || ""} 
            placeholder={placeholder}
            onChange={onChangeHandler}
            className="form-control"
            {...props}
            />
            <ErrorWrapper
                validation={validation}
                filedCurrentVal={filedCurrentVal}
            />
        </div>
    );
};

export const CustomTextarea = ({
    value = "",
    placeholder = enterText,
    label = "custom-textarea",
    name = "custom-textarea",
    validation = {},
    onChange = () => {},
    ...props
}) => {
    const [onChangeHandler,onFormatValue,filedCurrentVal] = useCustomFields({onChange,value,validation})
    return (
        <div className="form-field-group mb-3">
            {label && <label htmlFor="custom-textarea" className="form-label">{label}</label>}
            <textarea
            value={onFormatValue()} 
            name={name || ""} 
            placeholder={placeholder}
            onChange={onChangeHandler}
            className="form-control"
            {...props}
            />
            <ErrorWrapper
                validation={validation}
                filedCurrentVal={filedCurrentVal}
            />
        </div>
    );
};

export const CustomSelectbox = ({
    value = "",
    placeholder = enterText,
    label = "custom-selectbox",
    name = "custom-selectbox",
    option = [],
    validation = {},
    onChange = () => {},
    ...props
}) => {
    const [onChangeHandler,onFormatValue,filedCurrentVal] = useCustomFields({onChange,value,validation})
    return (
        <div className="form-field-group mb-3">
            {label && <label htmlFor="custom-selectbox" className="form-label">{label}</label>}
            <select
            name={name}
            value={value ? onFormatValue() : '1'}
            onChange={onChangeHandler}
            className="form-control"
            {...props}
            >
                <option value={'1'} disabled>{placeholder}</option>
                {
                    option?.map(optionVal => (
                        <option value={optionVal.value} key={name + "_" + optionVal.value}>{optionVal.text}</option>
                    ))
                }
            </select>

            <ErrorWrapper
                validation={validation}
                filedCurrentVal={filedCurrentVal}
            />
        </div>
    );
};
