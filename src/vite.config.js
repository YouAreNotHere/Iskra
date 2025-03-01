export default {
    server: {
        proxy: {
            '/api': {
                target: 'http://iskra.infinityfreeapp.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
};