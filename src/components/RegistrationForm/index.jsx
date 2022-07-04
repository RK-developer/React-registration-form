import React, { useState, useEffect, useCallback } from "react";
import {
    CustomInput,
    CustomTextarea,
    CustomSelectbox,
} from "../CustomValidation";
import { countryList } from "../../data/countryList";

const RegistrationForm = (props) => {
    const [registrationState, setRegistrationState] = useState({
        name: {},
        email: {},
        message: {},
    });

    const [currentStateList, setCurrentStateList] = useState(null);
    const [currentCityList, setCurrentCityList] = useState(null);

    useEffect(() => {
        if(registrationState.country?.value) {
            setCurrentStateList(
                getCurrentState(registrationState.country?.value)
            );
        }
    },[registrationState.country]);

    useEffect(() => {
        if(registrationState.state?.value) {
            setCurrentCityList(
                getCurrentCity(registrationState.state?.value)
            );
        }
    },[registrationState.state]);

    const onChangeHandler = useCallback(
        (targetValue, event) =>
            setRegistrationState((prevState) => {
                const newState = {
                    ...prevState,
                    [event.target.name]: targetValue,
                }
                if(event.target.name === 'country' && prevState?.country?.value !== targetValue?.value) {
                    newState["state"] = ""; 
                    newState["city"] = "";
                }
               return newState;
            }),
        []
    );

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

    return (
        <form className="registration-form">
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
                    onChange={onChangeHandler}
                />
                {/**Country */}
                <CustomSelectbox
                    // value = {registrationState.mobile?.value}
                    placeholder={"Choose Country"}
                    value={registrationState.country?.value}
                    label={"Country"}
                    name={"country"}
                    option={countryList}
                    onChange={onChangeHandler}
                />
                {/**Country */}
                <CustomSelectbox
                    // value = {registrationState.mobile?.value}
                    placeholder={"Choose State"}
                    value={registrationState.state?.value}
                    label={"State"}
                    name={"state"}
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
                    option={
                        registrationState.state?.value && currentCityList
                    }
                    disabled={registrationState.state?.value ? false : true}
                    onChange={onChangeHandler}
                />
                {/**Message */}
                <CustomTextarea
                    value={registrationState.message?.value}
                    placeholder={"Enter Message"}
                    label={"Message"}
                    name={"message"}
                    onChange={onChangeHandler}
                />
            </div>
            <div className="form-footer">
                <button type="button" className="btn btn-primary reg-save">Save</button>
                <button type="button" className="btn btn-outline-secondary reg-reset">Reset</button>
            </div>
        </form>
    );
};

export default RegistrationForm;
