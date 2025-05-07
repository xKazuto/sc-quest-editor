
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Upload } from "lucide-react";

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
    <div className="quest-header space-y-2">
      <Button 
        onClick={onAddQuest} 
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        Add New Quest
      </Button>
      <Button 
        onClick={handleUploadClick} 
        variant="outline" 
        className="w-full flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
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
