import { UserTC } from 'app/schema/entities/UserTC';
import { FieldConfig } from 'app/schema/definitions';
import { ContactID, AccountID } from 'app/schema/types/Scalars';
import { update, UserUpdateArgs } from 'app/vendor/user/update';
import { UserRoleEnum } from '../types/Enums';

export default {
  type: UserTC,
  args: {
    id: ContactID.NonNull,
    profile: UserTC.schemaComposer.createInputTC({
      name: 'UpdateUserProfileInput',
      fields: {
        accountId: AccountID,
        role: UserRoleEnum,
        external: 'Boolean',
      },
    }),
  },
  resolve: (_, args) => {
    return update(args);
  },
} as FieldConfig<UserUpdateArgs>;