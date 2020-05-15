import moment from 'moment';

export const formatDate = date => {
    const now = moment(Date.now());
    const then = moment(date);
    const hours = now.diff(then, 'hours');
    const days = now.diff(then, 'days');

    return (
        hours < 24
            ? then.format('HH:mm')
            : days < 365
                ? then.format('D MMM')
                : then.format('MMM YYYY')
    );
}
