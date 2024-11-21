import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlayerQuest } from '@/lib/types/progression';

interface PlayerQuestSidebarProps {
  onUploadClick: () => void;
  onSave: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  quests: PlayerQuest[];
  selectedQuestId: string | null;
  onSelectQuest: (id: string) => void;
  onDeleteQuest: (id: string) => void;
}

export const PlayerQuestSidebar: React.FC<PlayerQuestSidebarProps> = ({
  onUploadClick,
  onSave,
  fileInputRef,
  handleFileUpload,
  quests,
  selectedQuestId,
  onSelectQuest,
  onDeleteQuest,
}) => {
  return (
    <div className="w-64 border-r border-border bg-card">
      <div className="p-4 space-y-2 bg-card">
        <Button onClick={onUploadClick} variant="outline" className="w-full">
          Load JSON File
        </Button>
        <Button onClick={onSave} variant="outline" className="w-full">
          Save JSON File
        </Button>
        <Input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-2 p-4">
          {quests.map((quest) => (
            <div
              key={quest.Id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedQuestId === quest.Id
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card text-card-foreground hover:bg-accent/50'
              }`}
              onClick={() => onSelectQuest(quest.Id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium truncate">
                  {quest.Id}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteQuest(quest.Id);
                  }}
                >
                  ×
                </Button>
              </div>
              <span className="text-sm opacity-75 block truncate">
                {quest.IsCompleted ? 'Completed' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};