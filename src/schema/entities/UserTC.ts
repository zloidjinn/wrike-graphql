import { composeWithJson } from 'graphql-compose-json';
import { TaskTC } from './TaskTC';
import { taskFindMany } from 'app/vendor/task/taskFindMany';
import { ContactID, AccountID } from 'app/schema/types/Scalars';
import { UserRoleEnum } from '../types/Enums';
import { accountFindOne } from 'app/vendor/account/accountFindOne';
import { AccountTC } from './AccountTC';

const restApiResponse = {
  // id: 'KUAHMNRA',
  id: ContactID.NonNull,
  firstName: 'Pavel',
  lastName: 'Chertorogov',
  type: 'Person',
  profiles: [
    {
      // accountId: 'IEADMUW4',
      accountId: AccountID,
      account: () => ({
        type: () => AccountTC,
        resolve: (s, _, __, info) => accountFindOne({ info }),
      }),
      email: 'pavel.chertorogov@gmail.com',
      // role: 'User',
      role: UserRoleEnum,
      external: false,
      admin: false,
      owner: true,
    },
  ],
  avatarUrl: 'https://www.wrike.com/avatars//77/A8/Box_ffe57373_80-67_v1.png',
  timezone: 'US/Pacific',
  locale: 'en',
  deleted: false,
  me: true,
  title: 'IT',
  companyName: 'Test',
  // additional fields
  tasksAuthored: () => ({
    type: () => TaskTC.NonNull.List,
    args: {
      limit: { type: 'Int', defaultValue: 10 },
    },
    resolve: (s, args, __, info) =>
      taskFindMany({ filter: { authors: [s.id] }, limit: args.limit, info }),
  }),
  tasksResponsible: () => ({
    type: () => TaskTC.NonNull.List,
    args: {
      limit: { type: 'Int', defaultValue: 10 },
    },
    resolve: (s, args, __, info) =>
      taskFindMany({ filter: { responsibles: [s.id] }, limit: args.limit, info }),
  }),
};

export const UserTC = composeWithJson('User', restApiResponse);
