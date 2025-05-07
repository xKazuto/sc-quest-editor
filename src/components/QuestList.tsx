
import React from 'react';
import { Quest } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

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
    <ScrollArea className="h-[calc(100vh-14rem)]">
      <div className="space-y-2 p-4">
        {quests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No quests yet. Click "Add New Quest" to create one.
          </div>
        ) : (
          quests.map((quest) => (
            <div
              key={quest.Id}
              className={`quest-item ${
                selectedQuestId === quest.Id
                  ? 'bg-quest-selected text-quest-text'
                  : 'bg-quest-background/60 text-quest-text hover:bg-quest-hover'
              }`}
              onClick={() => onSelectQuest(quest.Id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium truncate">
                  {quest.Name || 'Unnamed Quest'}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-70 hover:opacity-100 hover:bg-destructive/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveQuest(quest.Id);
                  }}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm opacity-75 block truncate">
                ID: {quest.Id}
              </span>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default QuestList;
