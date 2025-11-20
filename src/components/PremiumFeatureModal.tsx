import { Lock, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PremiumFeatureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumFeatureModal = ({ open, onOpenChange }: PremiumFeatureModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Lock className="h-6 w-6 text-amber-500" />
            Premium Feature
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center space-y-4 py-6">
          <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/30">
            <Lock className="w-12 h-12 text-amber-500" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              Available in Premium Version
            </p>
            <p className="text-sm text-muted-foreground max-w-sm">
              This advanced feature is available in the full Orbital Premium Edition.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 border-amber-500/30 hover:bg-amber-500/10"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
