import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Skull, Compass, ShoppingCart } from "lucide-react";

interface QuestTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const questTypes = [
  { id: 1, name: "Turn-In", icon: Upload },
  { id: 2, name: "Kill Quest", icon: Skull },
  { id: 3, name: "Exploration Quest", icon: Compass },
  { id: 4, name: "Trade Quest", icon: ShoppingCart },
];

export const QuestTypeSelector: React.FC<QuestTypeSelectorProps> = ({
  value,
  onValueChange
}) => {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-1">Quest Type</p>
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select quest type">
            {questTypes.find(type => type.id.toString() === value)?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {questTypes.map((type) => {
            const Icon = type.icon;
            return (
              <SelectItem 
                key={type.id} 
                value={type.id.toString()}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{type.name}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};