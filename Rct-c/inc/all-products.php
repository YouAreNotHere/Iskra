<?php

function get_all_products_ajax() {
	$life_time = HOUR_IN_SECONDS; // кэшируем на один час
	header( 'Expires: ' . gmdate('D, d M Y H:i:s', time() + $life_time) . ' GMT' );
	header( 'Cache-control: public' );

    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    );

    $products = new WP_Query($args);

    if ($products->have_posts()) {
        $response = array();

        while ($products->have_posts()) {
            $products->the_post();
            $product = wc_get_product(get_the_ID());

            $regular_price = $product->get_regular_price();
            $price = $product->get_price();
            $is_on_sale = $product->is_on_sale();

            if ($product->is_type('variable')) {
                $variations = $product->get_visible_children();
                
                foreach ($variations as $variation_id) {
                    $variation = wc_get_product($variation_id);
                    if ($variation->is_on_sale()) {
                        $regular_price = $variation->get_regular_price();
                        $price = $variation->get_price();
                        $is_on_sale = true;
                        break; 
                    }
                }

                if (!$is_on_sale) {
                    $regular_price = $product->get_regular_price();
                    $price = $product->get_price();
                    $is_on_sale = $product->is_on_sale();
                }
            }

            if (empty($regular_price) && $is_on_sale) {
                $regular_price = $price;
            }

            $response[] = array(
                'id'            => $product->get_id(),
                'name'          => $product->get_name(),
                'price'         => $price,
                'regular_price' => $regular_price,
                'is_on_sale'    => $is_on_sale,
                'image'         => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? '',
                'slug'          => $product->get_slug(),
            );
        }

        wp_reset_postdata();
        wp_send_json_success($response);
    } else {
        wp_send_json_error(array('message' => 'Товары не найдены'));
    }

    wp_die();
}

add_action('wp_ajax_get_all_products', 'get_all_products_ajax');
add_action('wp_ajax_nopriv_get_all_products', 'get_all_products_ajax');