import { Quest, Goal, Reward, QuestGiver } from './types';

export const validateQuest = (quest: Partial<Quest>): string[] => {
  const errors: string[] = [];
  
  if (!quest.Id) errors.push('Quest ID is required');
  if (!quest.Name) errors.push('Quest name is required');
  if (!quest.Description) errors.push('Quest description is required');
  
  return errors;
};

export const createEmptyQuest = (): Quest => ({
  Id: '',
  TakerId: '',
  QType: 1,
  Name: '',
  Description: '',
  Goals: [],
  Rewards: [],
  PreQuests: [],
  IsRepeatable: false,
  RepeatDurationHours: 0,
  RepeatDurationMinutes: 0,
  EventId: '',
  EventSendToClient: false,
  ResetKillsComplete: false,
  ShowGoalItems: false,
  ShowRewardItems: false,
  SoundAccept: '',
  SoundComplete: '',
  Abandonable: false,
});

export const createEmptyGoal = (): Goal => ({
  QType: 1,
  ClassName: '',
  State: false,
  Count: 0,
  Quantity: 0,
  Value: '',
  TriggerCoordinate: '',
  TriggerRadius: 0,
  TriggerId: '',
  TriggerEventId: '',
  TriggerSendToClient: false,
  Description: '',
  KeepItem: false,
});

export const createEmptyReward = (): Reward => ({
  RewardType: 1,
  ClassName: '',
  Amount: 0,
  Quantity: 0,
});