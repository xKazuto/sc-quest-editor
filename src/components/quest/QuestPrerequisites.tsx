
import React, { useEffect } from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuestPrerequisitesProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestPrerequisites: React.FC<QuestPrerequisitesProps> = ({ quest, onChange }) => {
  // Store the raw input as a string in component state
  const [rawInput, setRawInput] = React.useState<string>('');
  
  // Update the internal state whenever quest changes
  useEffect(() => {
    setRawInput(quest.PreQuests?.join(', ') || '');
  }, [quest.Id, quest.PreQuests]);

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
      <Label className="text-sm font-medium">Pre-Quests (comma-separated IDs)</Label>
      <Input
        value={rawInput}
        onChange={handleInputChange}
        placeholder="quest1, quest2, quest3"
        className="mt-1"
      />
    </div>
  );
};
