
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ContactDetails } from "@/types/booking";

interface ContactFormProps {
  contactDetails: ContactDetails;
  onContactChange: (field: keyof ContactDetails, value: string | boolean) => void;
}

export const ContactForm = ({ contactDetails, onContactChange }: ContactFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Contact Details</h4>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Country Code</Label>
          <Input
            value={contactDetails.countryCode}
            onChange={e => onContactChange('countryCode', e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <Label>Phone Number</Label>
          <Input
            value={contactDetails.phone}
            onChange={e => onContactChange('phone', e.target.value)}
            placeholder="Phone number"
            required
          />
        </div>
      </div>
      <div>
        <Label>Email (Optional)</Label>
        <Input
          type="email"
          value={contactDetails.email}
          onChange={e => onContactChange('email', e.target.value)}
          placeholder="Email address"
        />
      </div>
      <div>
        <Label>Special Requests</Label>
        <Textarea
          value={contactDetails.specialRequest}
          onChange={e => onContactChange('specialRequest', e.target.value)}
          placeholder="Any special requests..."
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="customize"
          checked={contactDetails.customizePlan}
          onCheckedChange={(checked) => 
            onContactChange('customizePlan', checked as boolean)
          }
        />
        <label
          htmlFor="customize"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I want to customize this package
        </label>
      </div>
    </div>
  );
};
