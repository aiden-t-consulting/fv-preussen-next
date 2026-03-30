"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Trophy, Calendar, Star } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";

const stats = [
  {
    value: 1919,
    label: "Gegründet",
    suffix: "",
    prefix: "",
    icon: Calendar,
    description: "Über 100 Jahre Vereinsgeschichte",
  },
  {
    value: 600,
    label: "Mitglieder",
    suffix: "+",
    prefix: "",
    icon: Users,
    description: "Aktive Spieler, Trainer & Fans",
  },
  {
    value: 16,
    label: "Teams",
    suffix: "",
    prefix: "",
    icon: Star,
    description: "Von der U6 bis zur Ü50",
  },
  {
    value: 12,
    label: "Titel",
    suffix: "+",
    prefix: "",
    icon: Trophy,
    description: "Regionale & Kreistitel",
  },
];

function useCountUp(target: number, duration = 2000, enabled: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, enabled]);

  return count;
}

function StatCard({ stat, animate }: { stat: (typeof stats)[0]; animate: boolean }) {
  const count = useCountUp(stat.value, 2200, animate);
  const Icon = stat.icon;

  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#039139]/20 mb-4 group-hover:bg-[#039139] transition-colors duration-300">
        <Icon className="w-6 h-6 text-[#81d742] group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-1">
        {stat.prefix}
        {animate ? count.toLocaleString("de-DE") : "—"}
        {stat.suffix}
      </div>
      <div className="text-[#81d742] font-bold text-sm uppercase tracking-widest mb-1">
        {stat.label}
      </div>
      <div className="text-gray-400 text-sm">{stat.description}</div>
    </div>
  );
}

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-[#15540a]">
      <div className="max-w-7xl mx-auto px-4">
        <StaggerContainer stagger={0.12} className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatCard stat={stat} animate={visible} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
