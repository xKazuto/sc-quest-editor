import React from 'react';
import QuestEditor from '@/components/QuestEditor';
import { QuestData } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { logout } = useAuth();
  const initialData: QuestData = {
    Quests: [],
    QuestGivers: []
  };

  const handleSave = (data: QuestData) => {
    console.log('Saving quest data:', data);
    const jsonString = JSON.stringify(data, null, 2);
    
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
      <div className="p-4 flex justify-end">
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
      <QuestEditor
        initialData={initialData}
        onSave={handleSave}
      />
    </div>
  );
};

export default Index;