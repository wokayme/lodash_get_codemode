import _ from 'lodash';

type Address = {
    postCode: string
    street: [string, string | undefined]
  }
  
type UserInfo = {
    address: Address
    previousAddress?: Address
}

export const Address = (user: UserInfo) => (
    _.get(user, 'address.street').filter(Boolean).join(', ')
)

type ResultOfAddress = ReturnType<typeof Address>; // any