/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... outras configs
    webpack(config) {
        // remove qualquer regra anterior para .svg se houver (opcional)
        // e adiciona a regra do svgr para arquivos importados por .tsx/.jsx
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

module.exports = nextConfig;
