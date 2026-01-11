import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, label, className, children }: PageHeaderProps) {
  return (
    <div className={cn("bg-primary text-primary-foreground py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider mb-2">
            {label}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
