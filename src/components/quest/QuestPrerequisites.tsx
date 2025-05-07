
import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";

interface QuestPrerequisitesProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestPrerequisites: React.FC<QuestPrerequisitesProps> = ({ quest, onChange }) => {
  // Store the raw input as a string in component state
  const [rawInput, setRawInput] = React.useState<string>(quest.PreQuests.join(', '));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Store the raw input value
    const inputValue = e.target.value;
    setRawInput(inputValue);
    
    // Only process the split operation when updating the quest data
    // This allows users to freely type commas
    const preQuests = inputValue
      .split(',')
      .map(id => id.trim())
      .filter(id => id);
      
    onChange({ PreQuests: preQuests });
  };

  return (
    <div>
      <label className="text-sm font-medium">Pre-Quests (comma-separated IDs)</label>
      <Input
        value={rawInput}
        onChange={handleInputChange}
        placeholder="quest1, quest2, quest3"
        className="mt-1"
      />
    </div>
  );
};
