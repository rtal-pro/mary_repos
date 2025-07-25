export type { IProject } from './project'

// Base types for the application - Following CLAUDE.md specifications
export interface IBaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface IAnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}

export type ComponentVariant = 'primary' | 'secondary' | 'outline';
export type ComponentSize = 'small' | 'medium' | 'large';

// Navigation types
export interface INavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

// Section types
export interface ISectionProps extends IBaseComponent {
  title?: string;
  subtitle?: string;
  animate?: boolean;
}

// Team member type
export interface ITeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

// Statistics type
export interface IStatistic {
  id: string;
  value: number;
  label: string;
  description?: string;
}

// Service type
export interface IService {
  id: string;
  title: string;
  description: string;
  icon: string;
}