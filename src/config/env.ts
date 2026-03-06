import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["DATABASE_URL", "PORT", "NODE_ENV"] as const;

type EnvVars = (typeof requiredEnvVars)[number];

function validateEnv(): Record<EnvVars, string> {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  return requiredEnvVars.reduce(
    (acc, key) => {
      acc[key] = process.env[key] as string;
      return acc;
    },
    {} as Record<EnvVars, string>,
  );
}

export const env = validateEnv();
