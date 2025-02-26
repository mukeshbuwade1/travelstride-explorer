
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { TravelerForm } from "./TravelerForm";
import { ContactForm } from "./ContactForm";
import { PaymentSummary } from "./PaymentSummary";
import { initializeRazorpayPayment } from "@/lib/payment";
import { ContactDetails, PackageDetails, Traveler } from "@/types/booking";

interface BookingFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  packageDetails: PackageDetails;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const BookingForm = ({ isOpen, onOpenChange, packageDetails }: BookingFormProps) => {
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [newTraveler, setNewTraveler] = useState<Omit<Traveler, 'id'>>({
    name: '',
    dateOfBirth: '',
    gender: 'male'
  });
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    countryCode: '+91',
    phone: '',
    email: '',
    specialRequest: '',
    customizePlan: false
  });

  const { toast } = useToast();
  const { user } = useAuth();

  const handleTravelerChange = (field: keyof Omit<Traveler, 'id'>, value: string) => {
    setNewTraveler(prev => ({ ...prev, [field]: value }));
  };

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

  const handleContactChange = (field: keyof ContactDetails, value: string | boolean) => {
    setContactDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
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
          status: 'pending',
          payment_status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;

      await initializeRazorpayPayment(
        data.id,
        totalAmount,
        packageDetails.name,
        contactDetails,
        {
          onSuccess: () => {
            toast({
              title: "Payment Successful",
              description: "Your booking has been confirmed.",
            });
            onOpenChange(false);
          },
          onError: (error) => {
            console.error('Payment failed:', error);
            toast({
              title: "Payment Failed",
              description: "Please try again or contact support if the issue persists.",
              variant: "destructive"
            });
          },
          onCancel: () => {
            toast({
              title: "Payment Cancelled",
              description: "You can complete the payment later from your bookings.",
              variant: "destructive"
            });
          }
        }
      );
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

            <TravelerForm
              newTraveler={newTraveler}
              onTravelerChange={handleTravelerChange}
              onAddTraveler={handleAddTraveler}
              travelers={travelers}
              onRemoveTraveler={(id) => setTravelers(travelers.filter(t => t.id !== id))}
            />

            <ContactForm
              contactDetails={contactDetails}
              onContactChange={handleContactChange}
            />
          </div>

          <PaymentSummary
            packageDetails={packageDetails}
            travelersCount={travelers.length}
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
