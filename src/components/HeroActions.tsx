import { useEffect, useState, useRef } from 'react';
import { Button } from "@material-tailwind/react";
import {
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaExternalLinkAlt,
  FaCode,
  FaCalendarAlt,
  FaFire
} from 'react-icons/fa';
import { GitHubStatsService } from '../services/githubStatsService';
import { animations } from '../utils/animations';

interface HeroActionsProps {
  onNavigateToSection?: (section: string) => void;
}

interface GitHubActivity {
  recentCommits: number;
  lastCommitDate: string;
  lastActiveRepo: string;
  totalEventsToday: number;
}

function HeroActions({ onNavigateToSection }: HeroActionsProps) {
  const [activity, setActivity] = useState<GitHubActivity>({
    recentCommits: 0,
    lastCommitDate: '',
    lastActiveRepo: '',
    totalEventsToday: 0
  });
  const [loading, setLoading] = useState(true);

  // Refs for animations
  const ctaRef = useRef<HTMLButtonElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const activityData = await GitHubStatsService.getRecentActivity();
        setActivity(activityData);
      } catch (error) {
        console.error('Error loading GitHub activity:', error);
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
    
    // Refresh activity every 5 minutes
    const interval = setInterval(loadActivity, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      animations.fadeIn(ctaRef.current, {
        duration: 0.6,
        delay: 0.1,
        y: 20,
        scrollTrigger: false
      });

      animations.fadeIn(activityRef.current, {
        duration: 0.8,
        delay: 0.3,
        y: 30,
        scrollTrigger: false
      });

      animations.fadeIn(socialRef.current, {
        duration: 0.6,
        delay: 0.5,
        y: 20,
        scrollTrigger: false
      });
    }, 200); // Small delay after parent animation

    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (section: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(section);
    } else {
      window.location.hash = section;
    }
  };

  const formatLastCommitDate = (dateString: string) => {
    if (!dateString) return 'No recent activity';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const socialLinks = [
    {
      label: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/khenderson20',
      color: 'hover:text-gray-300'
    },
    {
      label: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/kevin-h-cs',
      color: 'hover:text-blue-400'
    },
    {
      label: 'Resume',
      icon: FaDownload,
      url: '/resume.pdf',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
      {/* Primary CTA */}
      <Button
        ref={ctaRef}
        onClick={() => handleNavigation('development')}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl opacity-0"
      >
        <FaCode className="w-6 h-6" />
        Explore My Work
        <FaExternalLinkAlt className="w-5 h-5" />
      </Button>

      {/* GitHub Activity Display */}
      <div ref={activityRef} className="glass-effect rounded-2xl p-6 w-full max-w-md border border-white/20 opacity-0">
        <div className="flex items-center gap-3 mb-4">
          <FaGithub className="w-6 h-6 text-gray-300" />
          <h3 className="text-lg font-semibold text-white">Live Activity</h3>
          {!loading && activity.totalEventsToday > 0 && (
            <div className="flex items-center gap-1">
              <FaFire className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">Active today</span>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-600 rounded animate-pulse w-3/4"></div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Recent commits (7d)</span>
              <span className="text-white font-bold text-xl">{activity.recentCommits}</span>
            </div>
            
            {activity.lastActiveRepo && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Latest repo</span>
                <span className="text-blue-400 font-medium">{activity.lastActiveRepo}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4" />
                Last commit
              </span>
              <span className="text-green-400 font-medium">
                {formatLastCommitDate(activity.lastCommitDate)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div ref={socialRef} className="flex items-center gap-6 opacity-0">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 text-gray-400 ${link.color} group`}
              aria-label={link.label}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100">
                {link.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default HeroActions;
