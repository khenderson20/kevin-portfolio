import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== PORTFOLIO DATA SCHEMA ===============================================
This schema defines the data models for the portfolio website, including
projects, skills, and experience records. Uses guest access for public
read-only data with owner permissions for content management.
=========================================================================*/
const schema = a.schema({
  Project: a
    .model({
      title: a.string().required(),
      tech: a.string().array().required(),
      description: a.string().required(),
      metrics: a.string(),
      github: a.url(),
      demo: a.url(),
      image: a.url(),
      featured: a.boolean().default(false),
      category: a.enum(['frontend', 'backend', 'fullstack', 'mobile', 'audio']),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      // Public read-only access (for portfolio visitors)
      allow.publicApiKey().to(['read', 'list', 'get']),
      // Owner-only write access (for you/admin tooling)
      allow.owner().to(['create', 'update', 'delete']),
    ]),

  Skill: a
    .model({
      name: a.string().required(),
      category: a.string().required(),
      level: a.enum(['beginner', 'intermediate', 'advanced']),
      icon: a.string(),
      yearsExperience: a.integer(),
      featured: a.boolean().default(false),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'list', 'get']),
      allow.owner().to(['create', 'update', 'delete']),
    ]),

  Experience: a
    .model({
      role: a.string().required(),
      company: a.string().required(),
      period: a.string().required(),
      type: a.enum(['enterprise', 'research', 'development', 'freelance']),
      achievements: a.string().array(),
      technologies: a.string().array(),
      current: a.boolean().default(false),
      featured: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'list', 'get']),
      allow.owner().to(['create', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== USAGE EXAMPLES =====================================================
// Fetch featured projects for homepage
const { data: projects } = await client.models.Project.list({
  filter: { featured: { eq: true } }
});

// Get all skills by category
const { data: frontendSkills } = await client.models.Skill.list({
  filter: { category: { eq: "Frontend" } }
});
=========================================================================*/
