
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

interface Traveler {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
}

interface BookingFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  packageDetails: {
    id: number;
    name: string;
    duration: string;
    price: number;
  };
}

export const BookingForm = ({ isOpen, onOpenChange, packageDetails }: BookingFormProps) => {
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [newTraveler, setNewTraveler] = useState<Omit<Traveler, 'id'>>({
    name: '',
    dateOfBirth: '',
    gender: 'male'
  });
  const [contactDetails, setContactDetails] = useState({
    countryCode: '+91',
    phone: '',
    email: '',
    specialRequest: '',
    customizePlan: false
  });

  const { toast } = useToast();
  const { user } = useAuth();

  const handleAddTraveler = () => {
    if (!newTraveler.name || !newTraveler.dateOfBirth) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields for the traveler.",
        variant: "destructive"
      });
      return;
    }

    setTravelers([...travelers, { ...newTraveler, id: crypto.randomUUID() }]);
    setNewTraveler({
      name: '',
      dateOfBirth: '',
      gender: 'male'
    });
  };

  const handleRemoveTraveler = (id: string) => {
    setTravelers(travelers.filter(t => t.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelers.length) {
      toast({
        title: "No Travelers Added",
        description: "Please add at least one traveler to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (!contactDetails.phone) {
      toast({
        title: "Missing Contact Details",
        description: "Please provide a contact number.",
        variant: "destructive"
      });
      return;
    }

    try {
      const totalAmount = packageDetails.price * travelers.length;
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          package_id: packageDetails.id,
          user_id: user?.id,
          total_amount: totalAmount,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Booking Initiated",
        description: "Your booking has been created successfully. We'll contact you shortly.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Book Your Package</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{packageDetails.name}</h3>
              <p className="text-sm text-gray-500">{packageDetails.duration}</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Add Travelers</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={newTraveler.name}
                    onChange={e => setNewTraveler(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={newTraveler.dateOfBirth}
                    onChange={e => setNewTraveler(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select
                    value={newTraveler.gender}
                    onValueChange={value => setNewTraveler(prev => ({ ...prev, gender: value as 'male' | 'female' | 'other' }))}
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
                  <Button onClick={handleAddTraveler}>Add Traveler</Button>
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
                      onClick={() => handleRemoveTraveler(traveler.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Contact Details</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Country Code</Label>
                  <Input
                    value={contactDetails.countryCode}
                    onChange={e => setContactDetails(prev => ({ ...prev, countryCode: e.target.value }))}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={contactDetails.phone}
                    onChange={e => setContactDetails(prev => ({ ...prev, phone: e.target.value }))}
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
                  onChange={e => setContactDetails(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label>Special Requests</Label>
                <Textarea
                  value={contactDetails.specialRequest}
                  onChange={e => setContactDetails(prev => ({ ...prev, specialRequest: e.target.value }))}
                  placeholder="Any special requests..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customize"
                  checked={contactDetails.customizePlan}
                  onCheckedChange={(checked) => 
                    setContactDetails(prev => ({ ...prev, customizePlan: checked as boolean }))
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
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-medium mb-4">Payment Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Price per person</span>
                  <span>₹{packageDetails.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of travelers</span>
                  <span>{travelers.length}</span>
                </div>
                <div className="flex justify-between font-semibold pt-3 border-t">
                  <span>Total Amount</span>
                  <span>₹{(packageDetails.price * travelers.length).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
            <Button 
              className="w-full"
              size="lg"
              onClick={handleSubmit}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
