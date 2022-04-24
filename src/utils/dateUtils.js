import moment from 'moment';

export const formatDateTime = (value, format) => {
    if(value && moment(value).isValid())
        return moment(value).format(format);
    return null;
};
