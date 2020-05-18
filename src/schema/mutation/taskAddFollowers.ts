import { TaskTC } from 'app/schema/entities/TaskTC';
import { FieldConfig } from 'app/schema/definitions';
import { TaskID, ContactID } from 'app/schema/types/Scalars';
import { taskUpdate } from 'app/vendor/task/taskUpdate';

export default {
  type: TaskTC,
  args: {
    id: TaskID.NonNull,
    followers: ContactID.NonNull.List.NonNull,
  },
  resolve: (_, args) => {
    return taskUpdate({ id: args.id, task: { addFollowers: args.followers } });
  },
} as FieldConfig;
