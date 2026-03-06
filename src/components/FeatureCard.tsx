'use client';

import { ReactNode } from 'react';
import AnimationFadeUp from './animation/fade-up';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  delay?: number;
}

export default function FeatureCard({ title, description, icon, color, delay = 0.1 }: FeatureCardProps) {
  return (
    <AnimationFadeUp delay={delay} duration={0.5} once>
      <div 
        className="group relative p-8 rounded-2xl bg-white border border-gray-200/60 hover:border-opacity-60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        style={{ 
          '--hover-color': color,
        } as React.CSSProperties & { '--hover-color': string }}
      >
        <div 
          className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom right, ${color}15, transparent)`
          }}
        />
        <div className="relative">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
            style={{
              background: `linear-gradient(to bottom right, ${color}, ${color}dd)`
            }}
          >
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h3 
            className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300"
            style={{
              color: 'var(--hover-color, #1f2937)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#1f2937';
            }}
          >
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </AnimationFadeUp>
  );
}


