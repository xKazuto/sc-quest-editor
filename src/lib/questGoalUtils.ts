import { Goal } from '@/lib/types';

export const cleanGoalData = (goal: Goal): Goal => {
  const baseGoal = {
    QType: goal.QType,
    Description: goal.Description,
    TriggerEventId: goal.TriggerEventId,
    TriggerSendToClient: goal.TriggerSendToClient,
  };

  switch (goal.QType) {
    case 1: // Turn-In
      return {
        ...baseGoal,
        State: goal.State,
        ClassName: '',
        Count: undefined,
        Quantity: undefined,
        Value: '',
        TriggerCoordinate: '',
        TriggerRadius: 0,
        TriggerId: '',
        KeepItem: false,
      };
    case 2: // Kill Quest
      return {
        ...baseGoal,
        ClassName: goal.ClassName,
        Count: goal.Count,
        State: false,
        Quantity: undefined,
        Value: '',
        TriggerCoordinate: '',
        TriggerRadius: 0,
        TriggerId: '',
        KeepItem: false,
      };
    case 3: // Exploration Quest
      return {
        ...baseGoal,
        TriggerCoordinate: goal.TriggerCoordinate,
        TriggerRadius: goal.TriggerRadius,
        TriggerId: goal.TriggerId,
        ClassName: '',
        Count: undefined,
        Quantity: undefined,
        State: false,
        Value: '',
        KeepItem: false,
      };
    case 4: // Fetch/Bring Quest
      return {
        ...baseGoal,
        ClassName: goal.ClassName,
        Count: goal.Count,
        Quantity: goal.Quantity,
        State: false,
        Value: '',
        TriggerCoordinate: '',
        TriggerRadius: 0,
        TriggerId: '',
        KeepItem: false,
      };
    default:
      return goal;
  }
};