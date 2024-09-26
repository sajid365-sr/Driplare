type EnvFunction = {
  (key: string): string;
  bool(key: string, defaultValue: boolean): boolean;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ env }: { env: EnvFunction }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
