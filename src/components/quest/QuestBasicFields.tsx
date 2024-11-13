import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { FormItem } from "@/components/ui/form";

interface QuestBasicFieldsProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestBasicFields: React.FC<QuestBasicFieldsProps> = ({ quest, onChange }) => {
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? Number(value) : value;
    onChange({ [name]: finalValue });
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
    <div className="space-y-6">
      <FormItem>
        <Label>Quest ID</Label>
        <div className="flex gap-2">
          <Input
            name="Id"
            value={quest.Id}
            onChange={handleInputChange}
            placeholder="Enter Quest ID"
          />
          <Button 
            variant="outline"
            onClick={generateQuestId}
            type="button"
          >
            Generate
          </Button>
        </div>
      </FormItem>

      <FormItem>
        <Label>Quest Type</Label>
        <Input
          name="Type"
          type="number"
          value={quest.Type || 0}
          onChange={handleInputChange}
          placeholder="Enter Quest Type"
        />
      </FormItem>

      <FormItem>
        <Label>Taker ID</Label>
        <Input
          name="TakerId"
          value={quest.TakerId || ''}
          onChange={handleInputChange}
          placeholder="Enter Taker ID"
        />
      </FormItem>

      <FormItem>
        <Label>Name</Label>
        <Input
          name="Name"
          value={quest.Name || ''}
          onChange={handleInputChange}
          placeholder="Enter Quest Name"
        />
      </FormItem>
    </div>
  );
};