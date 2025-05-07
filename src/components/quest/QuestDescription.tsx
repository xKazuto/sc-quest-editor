
import React, { useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QuestDescriptionProps {
  description: string;
  onChange: (description: string) => void;
}

export const QuestDescription: React.FC<QuestDescriptionProps> = ({ description, onChange }) => {
  // Store description in local state
  const [localDescription, setLocalDescription] = React.useState<string>('');
  
  // Update local state when the quest changes
  useEffect(() => {
    setLocalDescription(description || '');
  }, [description]);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalDescription(value);
    onChange(value);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Description</Label>
      <Textarea
        value={localDescription}
        onChange={handleChange}
        className="min-h-[100px] bg-card/50"
        placeholder="Enter a detailed description of the quest..."
      />
    </div>
  );
};
