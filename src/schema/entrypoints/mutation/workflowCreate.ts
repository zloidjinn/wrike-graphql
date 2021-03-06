import { FieldConfig } from 'app/schema/definitions';
import { schemaComposer } from 'graphql-compose';
import { workflowCreate, CreateArgs } from 'app/vendor/workflow/workflowCreate';
import { WorkflowTC } from 'app/schema/entities/WorkflowTC';

export const WorkflowCreateInput = schemaComposer.createInputTC({
  name: 'WorkflowCreateInput',
  fields: {
    name: 'String!',
  },
});

export default {
  type: WorkflowTC,
  args: {
    workflow: WorkflowCreateInput.NonNull,
  },
  resolve: (_, args, context) => {
    return workflowCreate(args, context);
  },
} as FieldConfig<CreateArgs>;
