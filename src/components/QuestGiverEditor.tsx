import React, { useState } from 'react';
import { QuestGiver } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestGiverEditorProps {
  questGivers: QuestGiver[];
  onUpdate: (questGivers: QuestGiver[]) => void;
  availableQuestIds: string[];
}

const QuestGiverEditor: React.FC<QuestGiverEditorProps> = ({ questGivers, onUpdate, availableQuestIds }) => {
  const [newGiverId, setNewGiverId] = useState('');

  const handleAddQuestGiver = () => {
    if (newGiverId.trim()) {
      onUpdate([...questGivers, { Id: newGiverId, Quests: [] }]);
      setNewGiverId('');
    }
  };

  const handleRemoveQuestGiver = (id: string) => {
    onUpdate(questGivers.filter(giver => giver.Id !== id));
  };

  const handleQuestsChange = (giverId: string, questsString: string) => {
    const updatedQuestGivers = questGivers.map(giver => {
      if (giver.Id === giverId) {
        return {
          ...giver,
          Quests: questsString.split(',').map(q => q.trim()).filter(q => q)
        };
      }
      return giver;
    });
    onUpdate(updatedQuestGivers);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="New Quest Giver ID"
          value={newGiverId}
          onChange={(e) => setNewGiverId(e.target.value)}
        />
        <Button onClick={handleAddQuestGiver}>Add</Button>
      </div>
      
      <ScrollArea className="h-[300px] border rounded-md p-4">
        {questGivers.map((giver) => (
          <div key={giver.Id} className="mb-4 p-4 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">ID: {giver.Id}</span>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleRemoveQuestGiver(giver.Id)}
              >
                Remove
              </Button>
            </div>
            <div>
              <label className="text-sm font-medium">Assigned Quests (comma-separated)</label>
              <Input
                value={giver.Quests.join(', ')}
                onChange={(e) => handleQuestsChange(giver.Id, e.target.value)}
                placeholder="quest1, quest2, quest3"
                className="mt-1"
              />
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default QuestGiverEditor;