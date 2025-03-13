// src/vite-vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WORDPRESS_URL: string; // URL WordPress
    readonly VITE_API_ENDPOINT: string; // Эндпоинт для AJAX
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}