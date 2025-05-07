
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QuestDescriptionProps {
  description: string;
  onChange: (description: string) => void;
}

export const QuestDescription: React.FC<QuestDescriptionProps> = ({ description, onChange }) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Description</Label>
      <Textarea
        value={description ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px] bg-card/50"
        placeholder="Enter a detailed description of the quest..."
      />
    </div>
  );
};
