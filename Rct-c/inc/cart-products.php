<?php

function get_cart_contents_ajax() {
    error_log('AJAX request received for get_cart_contents!');

    if (!function_exists('WC')) {
        error_log('WooCommerce is not loaded');
        wp_send_json_error('WooCommerce not initialized');
        wp_die();
    }

    if (!WC()->session) {
        error_log('Initializing WooCommerce session');
        WC()->session = new WC_Session_Handler();
        WC()->session->init();
    }

    if (!WC()->cart) {
        error_log('Initializing WooCommerce cart');
        WC()->cart = new WC_Cart();
    }

    $cart_contents = WC()->cart->get_cart();
    // error_log('Cart contents: ' . print_r($cart_contents, true));

    if (empty($cart_contents)) {
        error_log('Cart is empty');
        wp_send_json_success(array('message' => 'Корзина пуста', 'cart' => array()));
        wp_die();
    }

    $response = array(
        'message' => 'Содержимое корзины успешно получено',
        'cart' => array(),
        'totals' => array(
            'subtotal' => WC()->cart->get_subtotal(),
            'subtotal_discounted' => WC()->cart->get_cart_subtotal(),
            'shipping_cost' => 0,
        ),
    );

    // Установка данных клиента
    if (!WC()->customer->get_shipping_country()) {
        WC()->customer->set_shipping_country(WC()->countries->get_base_country());
        WC()->customer->set_shipping_state('');
        WC()->customer->set_shipping_postcode('');
    }

    // Расчёт доставки
    WC()->cart->calculate_shipping();
    $packages = WC()->shipping->get_packages();
    error_log('Shipping packages: ' . print_r($packages, true));

    $shipping_cost = 0;
    if (!empty($packages)) {
        foreach ($packages as $package) {
            if (!empty($package['rates'])) {
                foreach ($package['rates'] as $rate) {
                    error_log('Shipping rate: ' . print_r($rate, true));
                    if ($rate->get_method_id() === 'flat_rate') {
                        $shipping_cost = $rate->get_cost();
                        break 2;
                    }
                }
            }
        }
    }

    $response['totals']['shipping_cost'] = $shipping_cost;

    // Обработка товаров в корзине
    foreach ($cart_contents as $cart_item_key => $cart_item) {
        $product = $cart_item['data'];

        $parent_id = $product->get_parent_id();
        $category_product_id = $parent_id ? $parent_id : $product->get_id();

        $categories = wp_get_post_terms($category_product_id, 'product_cat', array('fields' => 'names'));
        if (is_wp_error($categories)) {
            error_log('Error getting product categories: ' . $categories->get_error_message());
            $categories = array();
        }

        $regular_price = $product->get_regular_price();
        $sale_price = $product->get_sale_price();
        $price = $product->get_price();

        $item_data = array(
            'id' => $product->get_id(),
            'name' => $product->get_name(),
            'quantity' => $cart_item['quantity'],
            'price' => array(
                'regular' => $regular_price,
                'sale' => $sale_price,
                'current' => $price,
            ),
            'subtotal' => array(
                'regular' => $regular_price * $cart_item['quantity'],
                'current' => $price * $cart_item['quantity'],
            ),
            'image' => wp_get_attachment_image_src($product->get_image_id(), 'thumbnail')[0] ?? '',
            'cart_item_key' => $cart_item_key,
            'categories' => $categories,
            'attributes' => array(),
            'size' => '',
        );

        if ($product->is_type('variation')) {
            $attributes = isset($cart_item['variation']) ? $cart_item['variation'] : array();

            $formatted_attributes = array();
            foreach ($attributes as $key => $value) {
                $attribute_name = str_replace('attribute_', '', $key);
                $formatted_attributes[$attribute_name] = $value;
            }

            $item_data['attributes'] = $formatted_attributes;

            if (isset($attributes['attribute_pa_size'])) {
                $item_data['size'] = $attributes['attribute_pa_size'];
            }
        }

        $response['cart'][] = $item_data;
    }

    error_log('Response data: ' . print_r($response, true));
    wp_send_json_success($response);
    wp_die();
}

add_action('wp_ajax_get_cart_contents', 'get_cart_contents_ajax');
add_action('wp_ajax_nopriv_get_cart_contents', 'get_cart_contents_ajax');