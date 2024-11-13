import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface QuestDescriptionProps {
  description: string;
  onChange: (description: string) => void;
}

export const QuestDescription: React.FC<QuestDescriptionProps> = ({ description, onChange }) => {
  return (
    <div>
      <label className="text-sm font-medium">Description</label>
      <Textarea
        value={description ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1"
      />
    </div>
  );
};