<?php

function decrease_cart_item_quantity_ajax() {

    if (!isset($_POST['cart_item_key'])) {
        wp_send_json_error(array('message' => 'Не указан cart_item_key'));
        wp_die();
    }

    $cart_item_key = sanitize_text_field($_POST['cart_item_key']);
    error_log('Received cart_item_key: ' . $cart_item_key);

    if (!function_exists('WC')) {
        error_log('WooCommerce is not loaded.');
        wp_send_json_error(array('message' => 'WooCommerce не загружен'));
        wp_die();
    }

    if (!WC()->session) {
        WC()->session = new WC_Session_Handler();
        WC()->session->init();
    }

    if (!WC()->cart) {
        WC()->cart = new WC_Cart();
    }

    error_log('Cookies: ' . print_r($_COOKIE, true));

    error_log('Session data: ' . print_r(WC()->session, true));

    $cart_contents = WC()->cart->get_cart();
    error_log('Cart contents: ' . print_r($cart_contents, true));

    $cart_item = WC()->cart->get_cart_item($cart_item_key);

    if (!$cart_item) {
        wp_send_json_error(array('message' => 'Товар не найден в корзине'));
        wp_die();
    }

    $current_quantity = $cart_item['quantity'];

    $new_quantity = $current_quantity - 1;

    if ($new_quantity < 1) {
        WC()->cart->remove_cart_item($cart_item_key);
        wp_send_json_success(array('message' => 'Товар удалён из корзины'));
        wp_die();
    }

    WC()->cart->set_quantity($cart_item_key, $new_quantity);

    wp_send_json_success(array(
        'message' => 'Количество товара уменьшено',
        'new_quantity' => $new_quantity,
    ));
    wp_die();
}

add_action('wp_ajax_decrease_cart_item_quantity', 'decrease_cart_item_quantity_ajax');
add_action('wp_ajax_nopriv_decrease_cart_item_quantity', 'decrease_cart_item_quantity_ajax');