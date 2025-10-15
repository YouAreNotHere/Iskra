<?php

function get_cached_data() {
    $cache_key = 'my_custom_cache_key';
    $cached_data = get_transient($cache_key);

    if ($cached_data !== false) {
        wp_send_json_success($cached_data);
    }

    error_log('get cache');

    $data = [
        'news' => 'Some news data',
        'timestamp' => time(),
    ];

    set_transient($cache_key, $data, HOUR_IN_SECONDS);

    wp_send_json_success($data);
}
add_action('wp_ajax_get_cached_data', 'get_cached_data');
add_action('wp_ajax_nopriv_get_cached_data', 'get_cached_data');