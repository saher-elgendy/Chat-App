const isEmail = (email) => {
    const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.match(regEx)) return true;
    return false;
}

const isEmpty = (string) => {
    if (string.trim() === '') return true;
    return false;
}

exports.validateSignupData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    else if (!isEmail(data.email)) errors.email = 'Must be a valid email address';

    if (isEmpty(data.password)) errors.password = 'Must not be empty';

    if(isEmpty(data.confirmPassword)) errors.confirmPassword = 'Must not be empty';
    else if (data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords must match';

    if(isEmpty(data.handle)) errors.handle = 'Must not be empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateSigninData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) errors.email = 'Must not be empty'
    else if (!isEmail(data.email)) errors.email = 'Must be a valid email address';

    if (isEmpty(data.password)) errors.password = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if (!isEmpty(data.website.trim())) {
        // https://website.com
        if (data.website.trim().substring(0, 4) !== 'http') {
            userDetails.website = `http://${data.website.trim()}`;
        } else userDetails.website = data.website;
    }
    if (!isEmpty(data.location.trim())) userDetails.location = data.location;

    return userDetails;
}