export interface CloudflareEnv {
  MODE: string;
  DEMO_CLEAR_INTERVAL: string;
  KV: KVNamespace;
  ASSETS: Fetcher;
}

export const getEnv = (env: CloudflareEnv) => ({
  MODE: env.MODE ?? 'prod',
  DEMO_CLEAR_INTERVAL: Number(env.DEMO_CLEAR_INTERVAL) ?? 5,
  KV: env.KV,
});
