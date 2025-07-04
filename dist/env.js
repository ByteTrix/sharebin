export const getEnv = (env) => ({
    MODE: env.MODE ?? 'prod',
    DEMO_CLEAR_INTERVAL: Number(env.DEMO_CLEAR_INTERVAL) ?? 5,
    KV: env.KV,
});
