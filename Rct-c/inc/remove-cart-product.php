<?php

function remove_from_cart_ajax() {
    error_log('AJAX request received for remove_from_cart');

    if (!WC()->session) {
        WC()->session = new WC_Session_Handler();
        WC()->session->init();
    }

    if (!WC()->cart) {
        WC()->cart = new WC_Cart();
    }

    $cart_item_key = isset($_POST['cart_item_key']) ? sanitize_text_field($_POST['cart_item_key']) : '';

    if (!$cart_item_key) {
        wp_send_json_error(array('message' => 'Не указан ключ элемента корзины'));
        wp_die();
    }

    if (WC()->cart->remove_cart_item($cart_item_key)) {
        WC()->cart->calculate_totals(); 
        WC()->cart->maybe_set_cart_cookies(true); 

        wp_send_json_success(array('message' => 'Товар успешно удален из корзины'));
    } else {
        wp_send_json_error(array('message' => 'Не удалось удалить товар из корзины'));
    }

    wp_die();
}

add_action('wp_ajax_remove_from_cart', 'remove_from_cart_ajax');
add_action('wp_ajax_nopriv_remove_from_cart', 'remove_from_cart_ajax');