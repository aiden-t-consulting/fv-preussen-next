import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "inline-block text-xs font-bold uppercase tracking-[0.2em] mb-3",
            light ? "text-[#81d742]" : "text-[#039139]"
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
          light ? "text-white" : "text-[#111827]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-gray-300" : "text-[#6b7280]"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 rounded-full",
          align === "center" && "mx-auto",
          light ? "bg-[#81d742]" : "bg-[#039139]"
        )}
      />
    </div>
  );
}
