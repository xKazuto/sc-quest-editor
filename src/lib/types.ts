export interface Quest {
  Id: string;
  TakerId: string;
  Type: number;
  Name: string;
  Description: string;
  Goals: Goal[];
  Rewards: Reward[];
  PreQuests: string[];
  IsRepeatable: boolean;
  RepeatDurationHours: number;
  RepeatDurationMinutes: number;
  EventId: string;
  EventSendToClient: boolean;
  ResetKillsComplete: boolean;
  ShowGoalItems: boolean;
  ShowRewardItems: boolean;
  SoundAccept: string;
  SoundComplete: string;
  Abandonable: boolean;
}

export interface Goal {
  Type: number;
  ClassName: string;
  State: boolean;
  Count: number;
  Quantity: number;
  Value: string;
  TriggerCoordinate: string;
  TriggerRadius: number;
  TriggerId: string;
  TriggerEventId: string;
  TriggerSendToClient: boolean;
  Description: string;
  KeepItem: boolean;
}

export interface Reward {
  RewardType: number;
  ClassName: string;
  Amount: number;
  Quantity: number;
}

export interface QuestGiver {
  Id: string;
  Quests: string[];
}

export interface QuestData {
  Quests: Quest[];
  QuestGivers: QuestGiver[];
}