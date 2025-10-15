<?php

function post_order() {
    if (!defined('DOING_AJAX') || !DOING_AJAX) {
        wp_send_json_error('Invalid request.');
    }

    $first_name = isset($_POST['first_name']) ? sanitize_text_field($_POST['first_name']) : '';
    $last_name = isset($_POST['last_name']) ? sanitize_text_field($_POST['last_name']) : '';
    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
    $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
    $address = isset($_POST['address']) ? sanitize_text_field($_POST['address']) : '';
    $comments = isset($_POST['comments']) ? sanitize_textarea_field($_POST['comments']) : '';
    $payment_method = isset($_POST['payment_method']) ? sanitize_text_field($_POST['payment_method']) : '';
    $shipping_method = isset($_POST['shipping_method']) ? sanitize_text_field($_POST['shipping_method']) : '';

    if (empty($first_name) || empty($last_name) || empty($phone) || empty($email) || empty($payment_method) || empty($shipping_method)) {
        wp_send_json_error('Please fill in all required fields.');
    }

    if (WC()->cart->is_empty()) {
        wp_send_json_error('Your cart is empty.');
    }

    try {
        $order = wc_create_order();

        $order->set_billing_first_name($first_name);
        $order->set_billing_last_name($last_name);
        $order->set_billing_email($email);
        $order->set_billing_phone($phone);

        if (!empty($address)) {
            $order->set_shipping_first_name($first_name);
            $order->set_shipping_last_name($last_name);
            $order->set_shipping_address_1($address);
        }

        if (!empty($comments)) {
            $order->set_customer_note($comments);
        }

        $available_gateways = WC()->payment_gateways->get_available_payment_gateways();
        if (isset($available_gateways[$payment_method])) {
            $order->set_payment_method($available_gateways[$payment_method]->id);
            $order->set_payment_method_title($available_gateways[$payment_method]->title);
        } else {
            wp_send_json_error('Invalid payment method.');
        }

        $shipping_cost = 0; 
        $shipping_title = '';

        switch ($shipping_method) {
            case 'local_pickup': 
                $shipping_title = 'Самовывоз';
                $shipping_cost = 0;
                break;
            case 'flat_rate': // Курьер
                $shipping_title = 'Курьер';
                $shipping_cost = 1000;
                break;
            default:
                wp_send_json_error('Invalid shipping method.');
        }

        $shipping = new WC_Shipping_Rate(
            $shipping_method,
            $shipping_title,
            $shipping_cost, 
            [],
            $shipping_method 
        );
        $order->add_shipping($shipping);

        foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
            $product = $cart_item['data'];
            $quantity = $cart_item['quantity'];
            $variation_id = $cart_item['variation_id'];
            $attributes = $cart_item['variation'];

            $order->add_product($product, $quantity);

            if (!empty($attributes)) {
                foreach ($attributes as $attribute_name => $attribute_value) {
                    $order->add_meta_data($attribute_name, $attribute_value);
                }
            }
        }

        $order->calculate_totals();

        $order->set_status('pending');

        $order->save();

        WC()->cart->empty_cart();

        wp_send_json_success('Order created successfully. Order ID: ' . $order->get_id());
    } catch (Exception $e) {
        wp_send_json_error('Error creating order: ' . $e->getMessage());
    }
}

add_action('wp_ajax_post_order', 'post_order');
add_action('wp_ajax_nopriv_post_order', 'post_order');