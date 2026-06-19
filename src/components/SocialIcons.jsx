import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  GithubIcon as HugeGithub, 
  LinkedinIcon as HugeLinkedin, 
  FacebookIcon as HugeFacebook, 
  YoutubeIcon as HugeYoutube, 
  TiktokIcon as HugeTiktok,
  InstagramIcon as HugeInstagram
} from '@hugeicons/core-free-icons';

export function GithubIcon({ className = "w-5 h-5", ...props }) {
  return <HugeiconsIcon icon={HugeGithub} className={className} {...props} />;
}

export function LinkedinIcon({ className = "w-5 h-5", ...props }) {
  return <HugeiconsIcon icon={HugeLinkedin} className={className} {...props} />;
}

export function FacebookIcon({ className = "w-5 h-5", ...props }) {
  return <HugeiconsIcon icon={HugeFacebook} className={className} {...props} />;
}

export function YoutubeIcon({ className = "w-5 h-5", ...props }) {
  return <HugeiconsIcon icon={HugeYoutube} className={className} {...props} />;
}

export function TiktokIcon({ className = "w-5 h-5", ...props }) {
  return <HugeiconsIcon icon={HugeTiktok} className={className} {...props} />;
}

export function InstagramIcon({ className = "w-5 h-5", ...props }) {
  return <HugeiconsIcon icon={HugeInstagram} className={className} {...props} />;
}

