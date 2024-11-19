import { Goal } from '@/lib/types';

const createDefaultGoal = (): Omit<Goal, 'QType' | 'Description'> => ({
  ClassName: '',
  State: false,
  Value: '',
  TriggerCoordinate: '',
  TriggerRadius: 0,
  TriggerId: '',
  TriggerEventId: '',
  TriggerSendToClient: false,
  KeepItem: false,
});

export const cleanGoalData = (goal: Goal): Goal => {
  // Start with default values for all required properties
  const baseGoal = {
    ...createDefaultGoal(),
    QType: goal.QType,
    Description: goal.Description,
  };

  // Only add TriggerEventId and TriggerSendToClient if they are actually set
  if (goal.TriggerEventId) {
    baseGoal.TriggerEventId = goal.TriggerEventId;
  }
  if (goal.TriggerSendToClient) {
    baseGoal.TriggerSendToClient = goal.TriggerSendToClient;
  }

  // Add type-specific properties only if they are used
  switch (goal.QType) {
    case 1: // Turn-In
      return {
        ...baseGoal,
        State: goal.State,
      };

    case 2: // Kill Quest
      const killGoal = {
        ...baseGoal,
        ClassName: goal.ClassName,
      };
      if (goal.Count !== undefined) {
        Object.assign(killGoal, { Count: goal.Count });
      }
      return killGoal;

    case 3: // Exploration Quest
      return {
        ...baseGoal,
        TriggerCoordinate: goal.TriggerCoordinate,
        TriggerRadius: goal.TriggerRadius,
        TriggerId: goal.TriggerId,
      };

    case 4: // Fetch/Bring Quest
      const fetchGoal = {
        ...baseGoal,
        ClassName: goal.ClassName,
      };
      if (goal.Count !== undefined) {
        Object.assign(fetchGoal, { Count: goal.Count });
      }
      if (goal.Quantity !== undefined) {
        Object.assign(fetchGoal, { Quantity: goal.Quantity });
      }
      return fetchGoal;

    default:
      return baseGoal;
  }
};