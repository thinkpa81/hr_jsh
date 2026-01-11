import { FileText, FolderOpen, Users, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: "file" | "folder" | "users" | "bell";
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const icons = {
  file: FileText,
  folder: FolderOpen,
  users: Users,
  bell: Bell,
};

export function EmptyState({ icon = "folder", title, description, className, children }: EmptyStateProps) {
  const Icon = icons[icon];
  
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground max-w-sm mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}
