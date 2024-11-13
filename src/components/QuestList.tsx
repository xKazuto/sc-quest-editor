import React from 'react';
import { Quest } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestListProps {
  quests: Quest[];
  selectedQuestId: string | null;
  onSelectQuest: (questId: string) => void;
  onRemoveQuest: (questId: string) => void;
}

const QuestList: React.FC<QuestListProps> = ({
  quests,
  selectedQuestId,
  onSelectQuest,
  onRemoveQuest,
}) => {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-2 p-4 bg-quest-background">
        {quests.map((quest) => (
          <div
            key={quest.Id}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedQuestId === quest.Id
                ? 'bg-quest-selected text-quest-text'
                : 'bg-quest-background text-quest-text hover:bg-quest-hover'
            }`}
            onClick={() => onSelectQuest(quest.Id)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium truncate">
                {quest.Name || 'Unnamed Quest'}
              </span>
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
            <span className="text-sm opacity-75 block truncate">
              ID: {quest.Id}
            </span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default QuestList;