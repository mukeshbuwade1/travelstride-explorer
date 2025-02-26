
import { Button } from "@/components/ui/button";
import { PackageDetails } from "@/types/booking";

interface PaymentSummaryProps {
  packageDetails: PackageDetails;
  travelersCount: number;
  onSubmit: (e: React.MouseEvent) => void;
}

export const PaymentSummary = ({ packageDetails, travelersCount, onSubmit }: PaymentSummaryProps) => {
  return (
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
            <span>{travelersCount}</span>
          </div>
          <div className="flex justify-between font-semibold pt-3 border-t">
            <span>Total Amount</span>
            <span>₹{(packageDetails.price * travelersCount).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      <Button 
        className="w-full"
        size="lg"
        onClick={onSubmit}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};
