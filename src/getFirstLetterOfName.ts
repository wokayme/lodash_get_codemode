import _ from 'lodash';

type User = { name: string, surname: string | null };

export const getFirstLetterOfName = (user: User): string => {
    return _.get(user, 'name').slice(1);
}
