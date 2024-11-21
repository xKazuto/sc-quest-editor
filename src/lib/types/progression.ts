export interface DateInfo {
  Hour: number;
  Minute: number;
  Year: number;
  Month: number;
  Day: number;
  Permanent: number;
}

export interface QuestGoal {
  QType: number;
  ClassName: string;
  ClassNames: string[];
  State: number;
  Quantity: number;
  Count: number;
  MaxCount: number;
  Value: string;
  TriggerCoordinate: string;
  TriggerRadius: number;
  TriggerId: string;
  TriggerEventId: string;
  TriggerSendToClient: number;
  Description: string;
  KeepItem: number;
}

export interface QuestProgression {
  QType: number;
  Key: string;
  State: number;
  TurnGoals: Record<string, QuestGoal>;
  ItemGoals: Record<string, QuestGoal>;
  KillGoals: Record<string, QuestGoal>;
  ExploreGoals: Record<string, QuestGoal>;
  ActionGoals: Record<string, QuestGoal>;
  CompletionGoals: Record<string, QuestGoal>;
}

export interface PlayerQuest {
  Id: string;
  IsCompleted: number;
  IsRepeatable: number;
  DateTaken: DateInfo;
  DateCompleted: Partial<DateInfo>;
  UnixCompleted: number;
  Progression: QuestProgression;
  Goals: any[];
}

export interface KillRecord {
  ClassName: string;
  Count: number;
}

export interface PlayerQuestData {
  Quests: PlayerQuest[];
  Kills: Record<string, KillRecord>;
  CompletedQuests: string[];
  ActionQuests: Record<string, any>;
}