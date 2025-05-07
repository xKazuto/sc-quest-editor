
import React from 'react';
import { QuestData } from '@/lib/types';
import QuestList from './QuestList';
import { useQuestEditor } from './quest-editor/useQuestEditor';
import QuestEditorToolbar from './quest-editor/QuestEditorToolbar';
import QuestEditorTabs from './quest-editor/QuestEditorTabs';

interface QuestEditorProps {
  initialData: QuestData;
  onSave: (data: QuestData) => void;
}

const QuestEditor: React.FC<QuestEditorProps> = ({ initialData, onSave }) => {
  const {
    questData,
    selectedQuest,
    selectedQuestId,
    handleAddQuest,
    handleRemoveQuest,
    handleQuestChange,
    handleSave,
    handleFileUpload,
    handleQuestGiversUpdate,
    setSelectedQuestId
  } = useQuestEditor(initialData, onSave);

  return (
    <div className="flex h-[calc(100vh-12rem)] quest-card">
      <div className="quest-sidebar">
        <QuestEditorToolbar
          onAddQuest={handleAddQuest}
          onFileUpload={handleFileUpload}
        />
        <QuestList
          quests={questData.Quests}
          selectedQuestId={selectedQuestId}
          onSelectQuest={setSelectedQuestId}
          onRemoveQuest={handleRemoveQuest}
        />
      </div>
      <div className="quest-content bg-background/40">
        <QuestEditorTabs
          selectedQuest={selectedQuest}
          selectedQuestId={selectedQuestId}
          questData={questData}
          onQuestChange={handleQuestChange}
          onQuestGiversUpdate={handleQuestGiversUpdate}
          onSave={handleSave}
          onDeleteQuest={handleRemoveQuest}
        />
      </div>
    </div>
  );
};

export default QuestEditor;
