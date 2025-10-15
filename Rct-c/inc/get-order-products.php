<?php

function get_order_products_ajax() {
    error_log('AJAX request received for get_cart_contentsыыы');

    if (!WC()->session) {
        WC()->session = new WC_Session_Handler();
        WC()->session->init();
    }

    if (!WC()->cart) {
        WC()->cart = new WC_Cart();
    }

    $cart_contents = WC()->cart->get_cart();

    error_log('Cart contents: ' . print_r($cart_contents, true));

    $totals = array(
        'subtotal' => WC()->cart->get_subtotal(), 
        'subtotal_discounted' => WC()->cart->get_cart_subtotal(), 
        'shipping_cost' => 0, 
    );

    $shipping_cost = 0;

    if (!WC()->customer->get_shipping_country()) {
        WC()->customer->set_shipping_country(WC()->countries->get_base_country());
        WC()->customer->set_shipping_state('');
        WC()->customer->set_shipping_postcode('');
    }

    WC()->cart->calculate_shipping();

    $packages = WC()->shipping->get_packages();

    if (!empty($packages)) {
        foreach ($packages as $package) {
            if (!empty($package['rates'])) {
                foreach ($package['rates'] as $rate) {
                    if ($rate->get_method_id() === 'flat_rate') {
                        $shipping_cost = $rate->get_cost();
                        break 2;
                    }
                }
            }
        }
    }

    $totals['shipping_cost'] = $shipping_cost;

    $cart = array();

    if (!empty($cart_contents)) {
        foreach ($cart_contents as $cart_item_key => $cart_item) {
            $product = $cart_item['data']; 

            $parent_id = $product->get_parent_id(); 
            $category_product_id = $parent_id ? $parent_id : $product->get_id();

            $categories = wp_get_post_terms($category_product_id, 'product_cat', array('fields' => 'names'));
            if (is_wp_error($categories)) {
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

            if ($product->is_type('simple')) {
                $item_data['attributes'] = array(); 
                $item_data['size'] = ''; 
            }

            $cart[] = $item_data;
        }
    }

    $response = array(
        'message' => empty($cart_contents) ? 'Корзина пуста' : 'Содержимое корзины успешно получено',
        'cart' => $cart,
        'totals' => $totals,
    );

    wp_send_json_success($response);
    wp_die();
}

add_action('wp_ajax_get_order_products', 'get_order_products_ajax');
add_action('wp_ajax_nopriv_get_order_products', 'get_order_products_ajax');