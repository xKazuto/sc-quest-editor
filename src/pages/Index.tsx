import React from 'react';
import QuestEditor from '@/components/QuestEditor';
import { QuestData } from '@/lib/types';

const Index = () => {
  // Initialize with empty data structure
  const initialData: QuestData = {
    Quests: [],
    QuestGivers: []
  };

  const handleSave = (data: QuestData) => {
    // Here you would typically save to a file or backend
    console.log('Saving quest data:', data);
    const jsonString = JSON.stringify(data, null, 2);
    
    // Create a blob and download the file
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quests.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <QuestEditor
        initialData={initialData}
        onSave={handleSave}
      />
    </div>
  );
};

export default Index;