<?php

function register_custom_rest_routes() {
    register_rest_route('iskra/v1', '/products', array(
        'methods'  => 'GET',
        'callback' => 'get_all_products_rest',
        'permission_callback' => '__return_true', 
    ));
}
add_action('rest_api_init', 'register_custom_rest_routes');

function get_all_products_rest(WP_REST_Request $request) {
    error_log('get prdcts work');
    $life_time = HOUR_IN_SECONDS;
    header('Expires: ' . gmdate('D, d M Y H:i:s', time() + $life_time) . ' GMT');
    header('Cache-control: public');

    $page  = isset($_GET['page']) ? absint($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? absint($_GET['limit']) : 1;

    $args = array(
        'orderby' => 'date',
        'order'   => 'DESC',
        'page'    => $page,
        'limit'   => $limit,
    );

    $products = wc_get_products($args);
    $response = array();

    if (!$products) {
        return new WP_REST_Response(array(
            'message' => 'Товары не найдены'
        ), 404);
    }

    foreach ($products as $product) {
            $regular_price = $product->get_regular_price();
            $price = $product->get_price();
            $is_on_sale = $product->is_on_sale();

            if ($product->is_type('variable')) {
                $variation_prices = [];
                $variation_regular_prices = [];
                $variations_ids = $product->get_visible_children();

                foreach ($variations_ids as $variation_id) {
                    $variation = wc_get_product($variation_id);
                    if ($variation->is_on_sale()) {
                        $variation_prices[] = $variation->get_price();
                        $variation_regular_prices[] = $variation->get_regular_price();
                    } else {
                        $variation_prices[] = $variation->get_price();
                    }
                }

                if (!empty($variation_prices)) {
                    $price = min($variation_prices);
                }
                
                if (!empty($variation_regular_prices)) {
                    $regular_price = max($variation_regular_prices);
                    $is_on_sale = true;
                }

                if (empty($regular_price) && $is_on_sale) {
                    $regular_price = $price;
                }
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

        return rest_ensure_response($response);
}