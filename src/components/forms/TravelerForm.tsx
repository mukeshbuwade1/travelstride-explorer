
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Traveler } from "@/types/booking";

interface TravelerFormProps {
  newTraveler: Omit<Traveler, 'id'>;
  onTravelerChange: (field: keyof Omit<Traveler, 'id'>, value: string) => void;
  onAddTraveler: () => void;
  travelers: Traveler[];
  onRemoveTraveler: (id: string) => void;
}

export const TravelerForm = ({
  newTraveler,
  onTravelerChange,
  onAddTraveler,
  travelers,
  onRemoveTraveler
}: TravelerFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Add Travelers</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Full Name</Label>
          <Input
            value={newTraveler.name}
            onChange={e => onTravelerChange('name', e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            value={newTraveler.dateOfBirth}
            onChange={e => onTravelerChange('dateOfBirth', e.target.value)}
          />
        </div>
        <div>
          <Label>Gender</Label>
          <Select
            value={newTraveler.gender}
            onValueChange={value => onTravelerChange('gender', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={onAddTraveler}>Add Traveler</Button>
        </div>
      </div>

      <div className="space-y-2">
        {travelers.map(traveler => (
          <div key={traveler.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{traveler.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(traveler.dateOfBirth).toLocaleDateString()} • {traveler.gender}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveTraveler(traveler.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
