
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface QuestEditorToolbarProps {
  onAddQuest: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuestEditorToolbar: React.FC<QuestEditorToolbarProps> = ({ onAddQuest, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 space-y-2 bg-[#737373]">
      <Button 
        onClick={onAddQuest} 
        className="w-full bg-quest-background text-quest-text hover:bg-quest-hover"
      >
        Add New Quest
      </Button>
      <Button onClick={handleUploadClick} variant="outline" className="w-full">
        Load JSON File
      </Button>
      <Input
        type="file"
        accept=".json"
        onChange={onFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
};

export default QuestEditorToolbar;
