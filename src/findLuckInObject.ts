import _ from 'lodash';

export const findLuckInObject = (object: Record<string, string>): string => {
    return _.get(object, 'luck', 'there is no luck in object');
}
