import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  "data-testid"?: string;
}

export function ContentCard({ title, description, className, children, onClick, "data-testid": testId }: ContentCardProps) {
  return (
    <Card 
      className={cn(
        "hover-elevate transition-all duration-200",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      data-testid={testId}
    >
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      {children && (
        <CardContent>
          {children}
        </CardContent>
      )}
    </Card>
  );
}
