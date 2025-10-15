<?php

function get_product_quantity_ajax() {
    error_log('AJAX request received for product_quantity');

    if (!WC()->session) {
        WC()->session = new WC_Session_Handler();
        WC()->session->init();
    }

    if (!WC()->cart) {
        WC()->cart = new WC_Cart();
    }

    $cart_contents = WC()->cart->get_cart();

    error_log('Cart contentssss: ' . print_r($cart_contents, true));

    if (empty($cart_contents)) {
        wp_send_json_success(array('message' => 'Корзина пуста', 'cart' => array()));
        wp_die();
    }

    $response = array(
        'message' => 'Содержимое корзины успешно получено',
        'cart' => array(),
    );

    foreach ($cart_contents as $cart_item_key => $cart_item) {
        $product = $cart_item['data']; 
       
        $item_data = array(
            'cart_item_key' => $cart_item_key, 
        );

        $response['cart'][] = $item_data;
    }

    wp_send_json_success($response);
    wp_die();
}

add_action('wp_ajax_get_product_quantity', 'get_product_quantity_ajax');
add_action('wp_ajax_nopriv_get_product_quantity', 'get_product_quantity_ajax');