import { 
  BlueskyIcon, 
  FacebookIcon, 
  InstagramIcon, 
  LinkedinIcon,
  MediumIcon, 
  PinterestIcon, 
  TelegramIcon, 
  ThreadsIcon,
  TiktokIcon, 
  TumblrIcon, 
  XIcon, 
  YoutubeIcon 
} from "@/components/icons/SocialIcons";

export interface SocialPlatform {
  id: string;
  name: string;
  icon: any; // React component
  loginUrl: string;
  color: string;
  activeColor: string;
}

export const socialPlatforms: SocialPlatform[] = [
  { 
    id: 'bluesky', 
    name: 'Bluesky', 
    icon: BlueskyIcon, 
    loginUrl: '/platforms/bluesky',
    color: '#1DA1F2',
    activeColor: 'bg-[#1DA1F2]'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: FacebookIcon, 
    loginUrl: '/platforms/facebook',
    color: '#1877F2',
    activeColor: 'bg-[#1877F2]'
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: InstagramIcon, 
    loginUrl: '/platforms/instagram',
    color: '#E4405F',
    activeColor: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]'
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn', 
    icon: LinkedinIcon, 
    loginUrl: '/platforms/linkedin',
    color: '#0A66C2',
    activeColor: 'bg-[#0A66C2]'
  },
  { 
    id: 'medium', 
    name: 'Medium', 
    icon: MediumIcon, 
    loginUrl: '/platforms/medium',
    color: '#00ab6c',
    activeColor: 'bg-[#00ab6c]'
  },
  { 
    id: 'pinterest', 
    name: 'Pinterest', 
    icon: PinterestIcon, 
    loginUrl: '/platforms/pinterest',
    color: '#E60023',
    activeColor: 'bg-[#E60023]'
  },
  { 
    id: 'telegram', 
    name: 'Telegram', 
    icon: TelegramIcon, 
    loginUrl: '/platforms/telegram',
    color: '#26A5E4',
    activeColor: 'bg-[#26A5E4]'
  },
  { 
    id: 'threads', 
    name: 'Threads', 
    icon: ThreadsIcon, 
    loginUrl: '/platforms/threads',
    color: '#000000',
    activeColor: 'bg-[#000000]'
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: TiktokIcon, 
    loginUrl: '/platforms/tiktok',
    color: '#000000',
    activeColor: 'bg-[#000000]'
  },
  { 
    id: 'tumblr', 
    name: 'Tumblr', 
    icon: TumblrIcon, 
    loginUrl: '/platforms/tumblr',
    color: '#36465D',
    activeColor: 'bg-[#000000]'
  },
  { 
    id: 'x', 
    name: 'X', 
    icon: XIcon, 
    loginUrl: '/platforms/x',
    color: '#000000',
    activeColor: 'bg-[#000000]'
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: YoutubeIcon, 
    loginUrl: '/platforms/youtube',
    color: '#FF0000',
    activeColor: 'bg-[#FF0000]'
  },
];
