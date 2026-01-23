// Barrel exports for services
// Provides clean import interface for all service classes

export { GitHubService } from './githubService';
export { GitHubStatsService } from './githubStatsService';

// Type exports
export type {
  Project,
  ProjectCategory
} from '../types/portfolio';

export type {
  GitHubRepo
} from '../types/github';
