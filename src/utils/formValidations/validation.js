export const notAllowedFirstCharAsSpecial = (value) => {
    const pattern = /^[%=+-@]/;
    const trimedValue = value?.toString()?.trim();
    if(!trimedValue || trimedValue.length <=0) {
        return trimedValue;
    }

    if(pattern.test(trimedValue[0])) {
        return trimedValue.substring(1);
    }
    return value
}

export const isEmptyCheck = (value) => {
    if(!value || value.length <= 0) {
        return true;
    }
    return false;
}

export const isEmailCheck = value => {
    const emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegx.test(value);
}