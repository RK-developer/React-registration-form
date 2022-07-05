import React, { useState, useEffect, useCallback } from "react";
import {
    CustomInput,
    CustomTextarea,
    CustomSelectbox,
} from "../CustomValidation";
import { countryList } from "../../data/countryList";
import Modal from "../Modal";

const RegModalBodyContent = ({registrationState}) => {
    return (
        <div>
            <p>Form Submitted Successfully</p>
            {
                registrationState
                &&
                <ul>
                {Object.keys(registrationState)?.map(fields => (<li>{fields} : {registrationState[fields]?.value || ""}</li>))}
                </ul>
            }
        </div>
    )
}

const RegistrationForm = (props) => {
    const [registrationState, setRegistrationState] = useState({});

    const [currentStateList, setCurrentStateList] = useState(null);
    const [currentCityList, setCurrentCityList] = useState(null);
    const [saveBtnIsDisabled, setSaveBtnIsDisabled] = useState(true);
    const [isReset, setIsReset] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    useEffect(() => {
        const isError =
            !registrationState?.name?.value ||
            !registrationState?.email?.value ||
            registrationState?.email?.hasEmailError;
        if (isError) {
            setSaveBtnIsDisabled(true);
        } else {
            setSaveBtnIsDisabled(false);
        }
    }, [registrationState.name, registrationState.email]);

    useEffect(() => {
        if (registrationState.country?.value) {
            setCurrentStateList(
                getCurrentState(registrationState.country?.value)
            );
        }
    }, [registrationState.country]);

    useEffect(() => {
        if (registrationState.state?.value) {
            setCurrentCityList(getCurrentCity(registrationState.state?.value));
        }
    }, [registrationState.state]);

    const onChangeHandler = useCallback((targetValue, event) => {
        setIsReset(false);
        setRegistrationState((prevState) => {
            const newState = {
                ...prevState,
                [event.target.name]: targetValue,
            };
            if (
                event.target.name === "country" &&
                prevState?.country?.value !== targetValue?.value
            ) {
                newState["state"] = "";
                newState["city"] = "";
            }
            if (event.target.name === "mobile") {
                newState["mobile"]["value"] = event.target.value.replace(
                    /\D/,
                    ""
                );
            }
            return newState;
        });
    }, []);

    const getCurrentState = (currentCountryValue) => {
        return countryList.filter(
            (countryObj) => countryObj.value === currentCountryValue
        )?.[0]?.state;
    };
    const getCurrentCity = (currentStateValue) => {
        return currentStateList.filter(
            (stateObj) => stateObj.value === currentStateValue
        )?.[0]?.city;
    };

    const resetForm = () => {
        setRegistrationState({});
        setCurrentStateList(null);
        setCurrentCityList(null);
        setSaveBtnIsDisabled(true);
        setIsReset(true);
    };

    const registrationOnSubmit = (event) => {
        event.preventDefault();
        setIsFormSubmitted(true);
    }

    return (
        <>
             <form className="registration-form" onSubmit={registrationOnSubmit}>
            <h4>Registration</h4>
            <div className="form-container">
                {/**Name */}
                <CustomInput
                    type={"text"}
                    value={registrationState.name?.value}
                    placeholder={"Enter Name"}
                    label={"Name"}
                    name={"name"}
                    onChange={onChangeHandler}
                    isReset={isReset}
                    validation={{
                        empty: {
                            message: "This Filed is required",
                        },
                    }}
                />
                {/**Email */}
                <CustomInput
                    type={"text"}
                    value={registrationState.email?.value}
                    placeholder={"Enter Email"}
                    label={"Email"}
                    name={"email"}
                    isReset={isReset}
                    onChange={onChangeHandler}
                    validation={{
                        empty: {
                            message: "This Filed is required",
                        },
                        email: {
                            message: "Please enter a valid email",
                        },
                    }}
                />
                {/**Mobile */}
                <CustomInput
                    type={"text"}
                    value={registrationState.mobile?.value}
                    placeholder={"Enter Mobile Number"}
                    label={"Mobile"}
                    name={"mobile"}
                    isReset={isReset}
                    onChange={onChangeHandler}
                    maxLength="10"
                />
                {/**Country */}
                <CustomSelectbox
                    // value = {registrationState.mobile?.value}
                    placeholder={"Choose Country"}
                    value={registrationState.country?.value}
                    label={"Country"}
                    name={"country"}
                    option={countryList}
                    isReset={isReset}
                    onChange={onChangeHandler}
                />
                {/**Country */}
                <CustomSelectbox
                    // value = {registrationState.mobile?.value}
                    placeholder={"Choose State"}
                    value={registrationState.state?.value}
                    label={"State"}
                    name={"state"}
                    isReset={isReset}
                    disabled={registrationState.country?.value ? false : true}
                    option={
                        registrationState.country?.value && currentStateList
                    }
                    onChange={onChangeHandler}
                />
                {/**Country */}
                <CustomSelectbox
                    // value = {registrationState.mobile?.value}
                    placeholder={"Choose City"}
                    value={registrationState.city?.value}
                    label={"City"}
                    name={"city"}
                    isReset={isReset}
                    option={registrationState.state?.value && currentCityList}
                    disabled={registrationState.state?.value ? false : true}
                    onChange={onChangeHandler}
                />
                {/**Message */}
                <CustomTextarea
                    value={registrationState.message?.value}
                    placeholder={"Enter Message"}
                    label={"Message"}
                    name={"message"}
                    isReset={isReset}
                    onChange={onChangeHandler}
                />
            </div>
            <div className="form-footer">
                <button
                    type="submit"
                    className="btn btn-primary reg-save"
                    disabled={saveBtnIsDisabled}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary reg-reset"
                    onClick={resetForm}
                >
                    Reset
                </button>
            </div>
        </form>

        {
            isFormSubmitted
            &&
            <Modal
            isFormSubmitted = {isFormSubmitted}
            title = "Registration Completed"
            isCancel = {false}
            okText = "Ok"
            bodyContent = { <RegModalBodyContent registrationState={registrationState} />}
            closeHandler = {() => setIsFormSubmitted(false)}
            />
        }
        </>
       
    );
};

export default RegistrationForm;
