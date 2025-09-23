export default {
    server: {
        proxy: {
            '/api': {
                target: 'https://anton.great-site.net',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
};