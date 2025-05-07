
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface QuestEditorHeaderProps {
  selectedQuest: boolean;
  questName: string;
  onSave: () => void;
  onDeleteCurrentQuest?: () => void;
}

const QuestEditorHeader: React.FC<QuestEditorHeaderProps> = ({ 
  selectedQuest, 
  questName, 
  onSave,
  onDeleteCurrentQuest
}) => {
  return (
    <>
      {selectedQuest && (
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-black">
            Editing Quest: {questName || 'Unnamed Quest'}
          </h2>
          <div className="flex gap-2">
            {onDeleteCurrentQuest && (
              <Button 
                variant="destructive" 
                onClick={onDeleteCurrentQuest}
                className="flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Delete Quest
              </Button>
            )}
            <Button 
              onClick={onSave}
              className="bg-quest-background text-quest-text hover:bg-quest-hover"
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestEditorHeader;
