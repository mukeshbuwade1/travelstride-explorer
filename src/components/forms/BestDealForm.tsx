
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BestDealFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  packageTitle: string;
  destination: string;
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  sourceCity: string;
  travelDate: string;
  numberOfPeople: string;
}

export const BestDealForm = ({
  isOpen,
  onOpenChange,
  packageTitle,
  destination,
  onSubmit
}: BestDealFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    sourceCity: "",
    travelDate: "",
    numberOfPeople: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Best Deal for {packageTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Source City"
              name="sourceCity"
              value={formData.sourceCity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Destination"
              value={destination}
              disabled
            />
          </div>
          <div>
            <Input
              placeholder="Date of Travel"
              name="travelDate"
              type="date"
              value={formData.travelDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Number of People"
              name="numberOfPeople"
              type="number"
              min="1"
              value={formData.numberOfPeople}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
