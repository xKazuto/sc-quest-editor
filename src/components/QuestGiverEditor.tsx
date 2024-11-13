import React, { useState } from 'react';
import { QuestGiver } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface QuestGiverEditorProps {
  questGivers: QuestGiver[];
  onUpdate: (questGivers: QuestGiver[]) => void;
  availableQuestIds: string[];
}

const QuestGiverEditor: React.FC<QuestGiverEditorProps> = ({ questGivers, onUpdate, availableQuestIds }) => {
  const [newGiverId, setNewGiverId] = useState('');
  const [manualQuestInput, setManualQuestInput] = useState('');
  const { toast } = useToast();

  const handleAddQuestGiver = () => {
    if (newGiverId.trim()) {
      onUpdate([...questGivers, { Id: newGiverId, Quests: [] }]);
      setNewGiverId('');
      toast({
        title: "Quest Giver Added",
        description: `New quest giver "${newGiverId}" has been added.`,
      });
    }
  };

  const handleRemoveQuestGiver = (id: string) => {
    onUpdate(questGivers.filter(giver => giver.Id !== id));
    toast({
      title: "Quest Giver Removed",
      description: `Quest giver "${id}" has been removed.`,
      variant: "destructive",
    });
  };

  const handleAddQuestToGiver = (giverId: string, questId: string) => {
    const updatedQuestGivers = questGivers.map(giver => {
      if (giver.Id === giverId && !giver.Quests.includes(questId)) {
        return {
          ...giver,
          Quests: [...giver.Quests, questId]
        };
      }
      return giver;
    });
    onUpdate(updatedQuestGivers);
    toast({
      title: "Quest Added",
      description: `Quest "${questId}" has been added to quest giver "${giverId}".`,
    });
  };

  const handleRemoveQuestFromGiver = (giverId: string, questId: string) => {
    const updatedQuestGivers = questGivers.map(giver => {
      if (giver.Id === giverId) {
        return {
          ...giver,
          Quests: giver.Quests.filter(q => q !== questId)
        };
      }
      return giver;
    });
    onUpdate(updatedQuestGivers);
    toast({
      title: "Quest Removed",
      description: `Quest "${questId}" has been removed from quest giver "${giverId}".`,
      variant: "destructive",
    });
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
      
      <ScrollArea className="h-[500px] border rounded-md p-4">
        {questGivers.map((giver) => (
          <div key={giver.Id} className="mb-6 p-4 border rounded-md">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">ID: {giver.Id}</span>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleRemoveQuestGiver(giver.Id)}
              >
                Remove
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Add Available Quest</h4>
                <Select
                  onValueChange={(value) => handleAddQuestToGiver(giver.Id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a quest" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableQuestIds.map((questId) => (
                      <SelectItem key={questId} value={questId}>
                        {questId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Add Manual Quest ID</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter quest ID manually"
                    value={manualQuestInput}
                    onChange={(e) => setManualQuestInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && manualQuestInput.trim()) {
                        handleAddQuestToGiver(giver.Id, manualQuestInput.trim());
                        setManualQuestInput('');
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      if (manualQuestInput.trim()) {
                        handleAddQuestToGiver(giver.Id, manualQuestInput.trim());
                        setManualQuestInput('');
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Assigned Quests</h4>
                <div className="space-y-2">
                  {giver.Quests.map((questId) => (
                    <div key={questId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>{questId}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveQuestFromGiver(giver.Id, questId)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default QuestGiverEditor;