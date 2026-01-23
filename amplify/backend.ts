import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { githubProxy } from './functions/githubProxy/resource';

defineBackend({
  auth,
  data,
  githubProxy,
});
