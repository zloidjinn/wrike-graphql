import { TaskTC } from 'app/schema/entities/TaskTC';
import { FieldConfig } from 'app/schema/definitions';
import { taskFindByIds } from 'app/vendor/task/taskFindByIds';
import { TaskID } from 'app/schema/types/Scalars';

export default {
  type: TaskTC.NonNull.List,
  args: {
    ids: TaskID.NonNull.List.NonNull,
  },
  resolve: (_, args, context, info) => {
    return taskFindByIds({ ids: args.ids, info }, context);
  },
  extensions: {
    complexity: ({ args, childComplexity }) => childComplexity * (args.ids.length || 100),
  },
} as FieldConfig<{ ids: string[] }>;
