
import React from 'react';
import { Quest, QuestData, QuestGiver } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestForm from '@/components/QuestForm';
import QuestGiverEditor from '@/components/QuestGiverEditor';
import QuestEditorHeader from './QuestEditorHeader';

interface QuestEditorTabsProps {
  selectedQuest: Quest | undefined;
  selectedQuestId: string | null;
  questData: QuestData;
  onQuestChange: (updatedQuest: Quest) => void;
  onQuestGiversUpdate: (newQuestGivers: QuestGiver[]) => void;
  onSave: () => void;
  onDeleteQuest: (questId: string) => void;
}

const QuestEditorTabs: React.FC<QuestEditorTabsProps> = ({
  selectedQuest,
  selectedQuestId,
  questData,
  onQuestChange,
  onQuestGiversUpdate,
  onSave,
  onDeleteQuest
}) => {
  // Function to delete the currently selected quest
  const handleDeleteCurrentQuest = () => {
    if (selectedQuestId) {
      onDeleteQuest(selectedQuestId);
    }
  };

  return (
    <Tabs defaultValue="quests" className="h-full flex flex-col">
      <TabsList className="bg-card/50 backdrop-blur-sm mx-auto">
        <TabsTrigger value="quests">Quests</TabsTrigger>
        <TabsTrigger value="questgivers">Quest Givers</TabsTrigger>
      </TabsList>
      <TabsContent value="quests" className="flex-1 overflow-auto">
        {selectedQuest ? (
          <>
            <QuestEditorHeader
              selectedQuest={!!selectedQuest}
              questName={selectedQuest.Name}
              onSave={onSave}
              onDeleteCurrentQuest={handleDeleteCurrentQuest}
            />
            <div className="glass-panel p-6">
              <QuestForm
                quest={selectedQuest}
                onChange={onQuestChange}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a quest to edit or create a new one
          </div>
        )}
      </TabsContent>
      <TabsContent value="questgivers" className="flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Quest Givers</h2>
            <Button onClick={onSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
          <div className="glass-panel p-6">
            <QuestGiverEditor
              questGivers={questData.QuestGivers}
              onUpdate={onQuestGiversUpdate}
              availableQuestIds={questData.Quests.map(q => q.Id)}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default QuestEditorTabs;
