// validation.js
export const validateForm = (values, rules) => {
    let errors = {};

    for (let field in rules) {
        if (rules[field].required && !values[field]) {
            errors[field] = `${field} is required`;
        }

        // Add email validation
        if (field === 'email' && values[field]) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(values[field])) {
                errors[field] = 'Invalid email format';
            }
        }
    }

    return errors;
};