<?php

function get_paginated_news() {
    error_log('AJAX запрос получен');

    $slug = sanitize_text_field($_POST['slug'] ?? '');
    $page = intval($_POST['page'] ?? 1);
    $per_page = intval($_POST['per_page'] ?? 2);

    if (!$slug) {
        wp_send_json_error('Slug не указан');
    }

    $page_obj = get_page_by_path($slug);
    if (!$page_obj) {
        error_log('Страница не найдена: ' . $slug);
        wp_send_json_error('Страница не найдена');
    }

    $content = apply_filters('the_content', $page_obj->post_content);
    
    preg_match_all('/<div[^>]*class=["\'][^"\']*wp-block-group[^"\']*["\'][^>]*>(.*?)<\/div>/s', $content, $matches);
    $all_news = $matches[0];
    $total = count($all_news);
    error_log("Найдено новостей: $total");

    $offset = ($page - 1) * $per_page;
    $paginated_news = array_slice($all_news, $offset, $per_page);

    wp_send_json_success([
        'news' => $paginated_news,
        'total' => $total,
        'page' => $page,
        'per_page' => $per_page
    ]);
}

add_action('wp_ajax_get_paginated_news', 'get_paginated_news');
add_action('wp_ajax_nopriv_get_paginated_news', 'get_paginated_news');