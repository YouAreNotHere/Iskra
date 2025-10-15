<?php

function get_page_content_by_slug() {
    error_log('AJAX запрос получен'); 

    if (!isset($_POST['slug'])) {
        error_log('Slug не передан'); 
        wp_send_json_error('Slug не указан');
    }

    $slug = sanitize_text_field($_POST['slug']);
    error_log('Получен slug: ' . $slug); 

    $page = get_page_by_path($slug);
    
    if (!$page) {
        error_log('Страница не найдена: ' . $slug); 
        wp_send_json_error('Страница не найдена');
    }

    $content = apply_filters('the_content', $page->post_content);
    error_log('Контент успешно получен для slug: ' . $slug);

    wp_send_json_success(['content' => $content]);
}

add_action('wp_ajax_get_page_by_slug', 'get_page_content_by_slug'); 
add_action('wp_ajax_nopriv_get_page_by_slug', 'get_page_content_by_slug'); 