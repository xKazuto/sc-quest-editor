import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface QuestBasicFieldsProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestBasicFields: React.FC<QuestBasicFieldsProps> = ({ quest, onChange }) => {
  const { toast } = useToast();
  
  const handleInputChange = (field: keyof Quest, value: string | number) => {
    onChange({ [field]: value });
  };

  const generateQuestId = () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 7);
    const newId = `QUEST_${timestamp}_${randomStr}`;
    onChange({ Id: newId });
    toast({
      title: "Quest ID Generated",
      description: "A new Quest ID has been automatically generated.",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Quest ID</label>
        <div className="flex gap-2 mt-1">
          <div className="flex-1 relative">
            <Input
              value={quest.Id ?? ''}
              onChange={(e) => handleInputChange('Id', e.target.value)}
              className="w-full pr-24"
              placeholder="Enter Quest ID"
              type="text"
              readOnly={false}
            />
            <Button 
              variant="outline"
              onClick={generateQuestId}
              className="absolute right-0 top-0 h-full rounded-l-none"
              type="button"
            >
              Generate
            </Button>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Quest Type</label>
        <Input
          type="number"
          value={quest.Type ?? 0}
          onChange={(e) => handleInputChange('Type', Number(e.target.value))}
          className="mt-1"
          placeholder="Enter Quest Type"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Taker ID</label>
        <Input
          value={quest.TakerId ?? ''}
          onChange={(e) => handleInputChange('TakerId', e.target.value)}
          className="mt-1"
          placeholder="Enter Taker ID"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          type="text"
          value={quest.Name ?? ''}
          onChange={(e) => handleInputChange('Name', e.target.value)}
          className="mt-1"
          placeholder="Enter Quest Name"
        />
      </div>
    </div>
  );
};