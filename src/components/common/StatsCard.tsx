import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className,
  iconColor = "text-primary",
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("hover:shadow-md transition-shadow duration-200", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {trend && (
                <p
                  className={cn(
                    "text-xs font-medium",
                    trendUp ? "text-success" : "text-destructive"
                  )}
                >
                  {trend}
                </p>
              )}
            </div>
            <div className={cn("rounded-xl bg-primary/10 p-3", iconColor.includes("text-") ? "" : "")}>
              <Icon className={cn("h-6 w-6", iconColor)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
