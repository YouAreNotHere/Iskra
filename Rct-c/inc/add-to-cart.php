<?php


function add_to_cart_ajax() {
    error_log('AJAX request received for add_to_cart');

    if (!WC()->session) {
        WC()->session = new WC_Session_Handler();
        WC()->session->init();
    }

    if (!WC()->cart) {
        WC()->cart = new WC_Cart();
    }

    $product_id = isset($_POST['product_id']) ? absint($_POST['product_id']) : 0;
    $quantity = isset($_POST['quantity']) ? absint($_POST['quantity']) : 1;
    $size = isset($_POST['size']) ? sanitize_text_field($_POST['size']) : '';

    error_log('Requested size: ' . $size);

    if (!$product_id) {
        wp_send_json_error(array('message' => 'Необходимо указать ID товара'));
        wp_die();
    }

    $product = wc_get_product($product_id);

    if (!$product) {
        wp_send_json_error(array('message' => 'Товар не найден'));
        wp_die();
    }

    error_log('Product Type: ' . $product->get_type());

    if ($product->is_type('variable')) {
        if (!$size) {
            wp_send_json_error(array('message' => 'Для переменного товара необходимо указать размер'));
            wp_die();
        }

        $available_variations = $product->get_available_variations();
        error_log('Available variations: ' . print_r($available_variations, true));

        $variation_id = 0;

        $requested_size_slug = sanitize_title($size); 

        foreach ($available_variations as $variation) {
            if (isset($variation['attributes']['attribute_pa_size'])) {
                $variation_size_slug = sanitize_title($variation['attributes']['attribute_pa_size']);

                error_log("Comparing size slugs: Variation size = {$variation_size_slug}, Requested size = {$requested_size_slug}");

                if ($variation_size_slug === $requested_size_slug) {
                    $variation_id = $variation['variation_id'];
                    break;
                }
            }
        }

        if (!$variation_id) {
            wp_send_json_error(array('message' => 'Вариация товара с указанным размером не найдена'));
            wp_die();
        }

        WC()->cart->add_to_cart($variation_id, $quantity);
    } elseif ($product->is_type('simple')) {
        WC()->cart->add_to_cart($product_id, $quantity);
    } else {
        wp_send_json_error(array('message' => 'Товар должен быть простым или переменным'));
        wp_die();
    }

    WC()->cart->calculate_totals();
    WC()->session->set('refresh_cart', true);
    WC()->cart->maybe_set_cart_cookies(true);

    error_log('Cart after adding item: ' . print_r(WC()->cart->get_cart(), true));

    wp_send_json_success(array('message' => 'Товар успешно добавлен в корзину'));
    wp_die();
}

add_action('wp_ajax_add_to_cart', 'add_to_cart_ajax');
add_action('wp_ajax_nopriv_add_to_cart', 'add_to_cart_ajax');