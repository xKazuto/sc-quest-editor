import React from 'react';
import { Quest } from '@/lib/types';
import { QuestBasicInfo } from './quest/QuestBasicInfo';
import { QuestDescription } from './quest/QuestDescription';
import { QuestGoals } from './quest/QuestGoals';
import { QuestRewards } from './quest/QuestRewards';
import { Card, CardContent } from "@/components/ui/card";

interface QuestFormProps {
  quest: Quest;
  onChange: (quest: Quest) => void;
}

export const QuestForm: React.FC<QuestFormProps> = ({ quest, onChange }) => {
  const updateQuest = (updates: Partial<Quest>) => {
    onChange({ ...quest, ...updates });
  };

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <QuestBasicInfo quest={quest} onChange={updateQuest} />
        
        <QuestDescription 
          description={quest.Description ?? ''} 
          onChange={(description) => updateQuest({ Description: description })} 
        />

        <QuestGoals 
          goals={quest.Goals} 
          onChange={(goals) => updateQuest({ Goals: goals })} 
        />

        <QuestRewards 
          rewards={quest.Rewards} 
          onChange={(rewards) => updateQuest({ Rewards: rewards })} 
        />
      </CardContent>
    </Card>
  );
};

export default QuestForm;