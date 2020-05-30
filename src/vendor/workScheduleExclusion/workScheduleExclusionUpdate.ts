import client from '../client';

export interface UpdateArgs {
  id: string;
  exclusion: Record<string, any>;
}

// https://developers.wrike.com/api/v4/work-schedule-exceptions/#update-work-schedule-exception
export async function workScheduleExclusionUpdate(opts: UpdateArgs) {
  const { id, exclusion } = opts || {};

  if (!id) throw new Error('You should provide `id`');
  const res = await client.put(`/workschedule_exclusions/${id}`, exclusion);
  return res?.data?.data[0];
}