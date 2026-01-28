import { cn } from "@/lib/utils";

interface PageBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PageBackground({ children, className }: PageBackgroundProps) {
  return (
    <div className={cn("relative min-h-screen w-full bg-gradient-to-br from-ceniza via-carboncillo to-ceniza overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&q=80')] bg-cover bg-center opacity-5 pointer-events-none"></div>
      {/* Gold accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
