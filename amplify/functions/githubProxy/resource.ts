import { defineFunction, secret } from '@aws-amplify/backend';

/**
 * Server-side GitHub proxy.
 *
 * Configure secrets in Amplify:
 * - GITHUB_TOKEN (secret)
 * - GITHUB_USERNAME (optional plain env var)
 */
export const githubProxy = defineFunction({
  name: 'githubProxy',
  entry: './handler.ts',
  timeoutSeconds: 10,
  environment: {
    GITHUB_TOKEN: secret('GITHUB_TOKEN'),
    // USERNAME defaults in the handler; override here if needed.
    GITHUB_USERNAME: 'khenderson20',
  },
});

