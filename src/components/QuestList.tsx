import React from 'react';
import { Quest } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createEmptyQuest } from '@/lib/questValidation';

interface QuestListProps {
  quests: Quest[];
  selectedQuestId: number | null;
  onSelectQuest: (quest: Quest) => void;
  onAddQuest: () => void;
  onRemoveQuest: (questId: number) => void;
}

const QuestList: React.FC<QuestListProps> = ({
  quests,
  selectedQuestId,
  onSelectQuest,
  onAddQuest,
  onRemoveQuest,
}) => {
  return (
    <div className="w-64 border-r bg-quest-background">
      <div className="p-4">
        <Button onClick={onAddQuest} className="w-full bg-quest-primary hover:bg-quest-secondary">
          Add New Quest
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-2 p-4">
          {quests.map((quest) => (
            <div
              key={quest.Id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedQuestId === quest.Id
                  ? 'bg-quest-primary text-white'
                  : 'hover:bg-quest-background'
              }`}
              onClick={() => onSelectQuest(quest)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium truncate">{quest.Name || 'Unnamed Quest'}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveQuest(quest.Id);
                  }}
                >
                  ×
                </Button>
              </div>
              <span className="text-sm opacity-75 block truncate">ID: {quest.Id}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuestList;