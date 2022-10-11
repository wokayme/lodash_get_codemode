import _ from 'lodash';

type User = { name: string, surname: string | null };

export const getFirstLetterOfSurname = (user: User): string => {
    return _.get(user, 'surname').slice(1);
}
