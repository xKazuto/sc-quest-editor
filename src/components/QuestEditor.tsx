import React, { useState } from 'react';
import { Quest, QuestData } from '@/lib/types';
import QuestList from './QuestList';
import QuestForm from './QuestForm';
import { createEmptyQuest } from '@/lib/questValidation';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface QuestEditorProps {
  initialData: QuestData;
  onSave: (data: QuestData) => void;
}

const QuestEditor: React.FC<QuestEditorProps> = ({ initialData, onSave }) => {
  const [questData, setQuestData] = useState<QuestData>(initialData);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddQuest = () => {
    const newQuest = createEmptyQuest();
    setQuestData(prev => ({
      ...prev,
      Quests: [...prev.Quests, newQuest]
    }));
    setSelectedQuestId(newQuest.Id);
    toast({
      title: "New Quest Added",
      description: "Start editing your new quest!",
    });
  };

  const handleRemoveQuest = (questId: string) => {
    setQuestData(prev => ({
      ...prev,
      Quests: prev.Quests.filter(q => q.Id !== questId)
    }));
    if (selectedQuestId === questId) {
      setSelectedQuestId(null);
    }
    toast({
      title: "Quest Removed",
      description: "The quest has been deleted.",
      variant: "destructive",
    });
  };

  const handleQuestChange = (updatedQuest: Quest) => {
    setQuestData(prev => ({
      ...prev,
      Quests: prev.Quests.map(q => 
        q.Id === updatedQuest.Id ? updatedQuest : q
      )
    }));
  };

  const handleSave = () => {
    onSave(questData);
    toast({
      title: "Changes Saved",
      description: "Your quest data has been saved successfully.",
    });
  };

  const selectedQuest = questData.Quests.find(q => q.Id === selectedQuestId);

  return (
    <div className="flex h-screen bg-gray-100">
      <QuestList
        quests={questData.Quests}
        selectedQuestId={selectedQuestId}
        onSelectQuest={(quest) => setSelectedQuestId(quest.Id)}
        onAddQuest={handleAddQuest}
        onRemoveQuest={handleRemoveQuest}
      />
      <div className="flex-1 p-6 overflow-auto">
        {selectedQuest ? (
          <>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold text-quest-primary">
                Editing Quest: {selectedQuest.Name || 'Unnamed Quest'}
              </h2>
              <Button onClick={handleSave} className="bg-quest-accent text-black hover:bg-quest-accent/90">
                Save Changes
              </Button>
            </div>
            <QuestForm
              quest={selectedQuest}
              onChange={handleQuestChange}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a quest to edit or create a new one
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestEditor;