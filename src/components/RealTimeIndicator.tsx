import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface RealTimeIndicatorProps {
  label?: string;
  className?: string;
}

export function RealTimeIndicator({ label = "Updating in real time", className = "" }: RealTimeIndicatorProps) {
  return (
    <Badge variant="outline" className={`gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
        <Activity className="h-3 w-3 text-success animate-pulse" />
        <span className="text-xs">{label}</span>
      </div>
    </Badge>
  );
}
