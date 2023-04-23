import { ZetkinEvent } from 'utils/types/zetkin';
import {
  ACTIVITIES,
  EventActivity,
} from 'features/campaigns/models/CampaignActivitiesModel';
import { doArbitraryClustering } from './clusterdEventsForWeekCalender';

const mockEventData: ZetkinEvent = {
  activity: {
    id: 1,
    title: 'Flyering',
  },
  campaign: {
    id: 1,
    title: 'My campaign',
  },
  contact: null,
  end_time: '1857-07-05T13:37:00.000Z',
  id: 1,
  info_text: '',
  location: {
    id: 1,
    lat: 0,
    lng: 0,
    title: 'Dorfplatz',
  },
  num_participants_available: 0,
  num_participants_required: 0,
  organization: {
    id: 1,
    title: 'KPD',
  },
  start_time: '1857-07-05T13:37:00.000Z',
};

function mockEvent(id: number, data: Partial<ZetkinEvent>): EventActivity {
  return {
    data: {
      ...mockEventData,
      ...data,
      id,
    },
    endDate: null,
    kind: ACTIVITIES.EVENT,
    startDate: null,
  };
}

describe('doArbitraryClustering()', () => {
  it('should not cluster if less then 4 events', () => {
    const result = doArbitraryClustering([
      mockEvent(1, {
        activity: {
          id: 5,
          title: 'JumpingJacks',
        },
      }),
      mockEvent(2, {
        activity: {
          id: 4,
          title: 'Dancing',
        },
      }),
      mockEvent(3, {}),
    ]);
    expect(result.length).toBe(3);
  });
});
