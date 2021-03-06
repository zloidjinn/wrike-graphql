import { TimelogID, TaskID, ContactID, TimelogCategoryID, DateYMD } from 'app/schema/types/Scalars';
import { schemaComposer } from 'graphql-compose';
import { BillingTypeEnum } from 'app/schema/types/Enums';
import { getRelationTaskId } from 'app/schema/relations/task';
import { getRelationContactId } from 'app/schema/relations/contact';
import { getRelationTimelogCategoryId } from 'app/schema/relations/timelogCategory';

export const TimelogTC = schemaComposer.createObjectTC({
  name: 'Timelog',
  fields: {
    id: TimelogID.NonNull,
    taskId: {
      type: TaskID.NonNull,
      description: 'Task to which timelog record is tracked',
    },
    userId: {
      type: ContactID.NonNull,
      description: 'User who tracked the timelog record',
    },
    categoryId: {
      type: TimelogCategoryID,
      description: 'Category of the timelog record',
    },
    billingType: {
      type: BillingTypeEnum,
      description: 'Timelog billing type (Wrike Resource only)',
    },
    hours: {
      type: 'Float!',
      description: 'Hours tracked in timelog record, must be in [0..24] hours range',
    },
    createdDate: {
      type: 'Date!',
      description: "Date of timelog was created. Format: yyyy-MM-dd'T'HH:mm:ss'Z'",
    },
    updatedDate: {
      type: 'Date!',
      description: "Date of timelog was updated. Format: yyyy-MM-dd'T'HH:mm:ss'Z'",
    },
    trackedDate: {
      type: DateYMD.NonNull,
      description: 'Date for which timelog was recorded. Format: yyyy-MM-dd',
    },
    comment: {
      type: 'String',
      description: 'Timelog record comment',
    },
  },
});

if (!process.env.DISABLE_RELATIONS) {
  TimelogTC.addFields({
    task: () => getRelationTaskId('taskId'),
    user: () => getRelationContactId('userId'),
    categoryId: () => getRelationTimelogCategoryId('categoryId'),
  });
}
