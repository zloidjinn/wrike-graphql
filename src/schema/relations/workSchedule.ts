import { resolveOneViaDL } from 'app/schema/dataLoaders';
import { ObjectTypeComposerFieldConfigDefinition } from 'graphql-compose';
import { WorkScheduleTC } from 'app/schema/entities/WorkScheduleTC';
import { workScheduleFindMany } from 'app/vendor/workSchedule/workScheduleFindMany';

export function getRelationWorkScheduleId(
  sourceFieldName: string
): ObjectTypeComposerFieldConfigDefinition<any, any> {
  return {
    type: () => WorkScheduleTC,
    resolve: process.env.DISABLE_DATALOADERS
      ? async (source, _, context, info) => {
          const records = await workScheduleFindMany({ info }, context);
          return records.find((x) => x.id === source[sourceFieldName]);
        }
      : resolveOneViaDL('WorkScheduleID', (s) => s[sourceFieldName]),
    projection: { [sourceFieldName]: 1 },
  };
}
