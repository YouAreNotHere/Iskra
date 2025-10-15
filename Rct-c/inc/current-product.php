<?php

function get_product_by_slug_ajax() {
    $slug = isset($_GET['slug']) ? sanitize_text_field($_GET['slug']) : '';

    if (empty($slug)) {
        wp_send_json_error(array('message' => 'Slug не указан'));
        wp_die();
    }

    $product_id = wc_get_product_id_by_sku($slug);

    if (!$product_id) {
        $product_post = get_page_by_path($slug, OBJECT, 'product');
        if ($product_post) {
            $product_id = $product_post->ID;
        }
    }

    if ($product_id) {
        $product = wc_get_product($product_id);

        if ($product->is_type('variable')) {
            $variations = $product->get_visible_children();
            $regular_price = null;
            $price = null;
            foreach ($variations as $variation_id) {
                $variation = wc_get_product($variation_id);
                if ($variation->is_on_sale()) {
                    $regular_price = $variation->get_regular_price();
                    $price = $variation->get_price();
                    break;
                }
            }

            if (empty($regular_price)) {
                $regular_price = $product->get_regular_price();
                $price = $product->get_price();
            }
        } else {
            $regular_price = $product->get_regular_price();
            $price = $product->get_price();
        }

        if (empty($regular_price) && $product->is_on_sale()) {
            $discount = $product->get_total_discount(); 
            if ($discount > 0) {
                $regular_price = $price / (1 - ($discount / 100));
            } else {
                $regular_price = $price;
            }
        }

        $attributes = array();
        foreach ($product->get_attributes() as $attribute_name => $attribute_data) {
            $attribute_values = array();
            $attribute_slug = sanitize_title($attribute_name);

            if ($attribute_data->is_taxonomy()) {
                $terms = wp_get_post_terms($product->get_id(), $attribute_slug, array('fields' => 'names'));
                if (!is_wp_error($terms)) {
                    $attribute_values = $terms;
                }
            } else {
                $values = $attribute_data->get_options();
                if (!empty($values)) {
                    $attribute_values = $values;
                }
            }

            if (!empty($attribute_values)) {
                $attributes[$attribute_name] = $attribute_values;
            }
        }

        $categories = wp_get_post_terms($product->get_id(), 'product_cat', array('fields' => 'names'));
        $tags = wp_get_post_terms($product->get_id(), 'product_tag', array('fields' => 'names'));

        $response = array(
            'id' => $product->get_id(),
            'name' => $product->get_name(),
            'price' => $price,
            'regular_price' => $regular_price,
            'is_on_sale' => $product->is_on_sale(),
            'description' => $product->get_description(),
            'attributes' => $attributes,
            'categories' => $categories,
            'tags' => $tags,
            'gallery_images' => array(),
            'brand' => '',
            'article' => $product->get_sku(),
        );

        $gallery_image_ids = $product->get_gallery_image_ids();
        foreach ($gallery_image_ids as $image_id) {
            $image_url = wp_get_attachment_image_src($image_id, 'full');
            if ($image_url && isset($image_url[0])) {
                $response['gallery_images'][] = $image_url[0];
            }
        }

        $brand_terms = get_the_terms($product_id, 'product_brand');
        if (!empty($brand_terms) && !is_wp_error($brand_terms)) {
            $brand = array_shift($brand_terms);
            $response['brand'] = array(
                'name' => $brand->name,
                'slug' => $brand->slug,
                'link' => get_term_link($brand)
            );
        }

        wp_send_json_success($response);
        wp_die();
    }

    wp_send_json_error(array('message' => 'Товар не найден'));
    wp_die();
}

add_action('wp_ajax_get_product_by_slug', 'get_product_by_slug_ajax');
add_action('wp_ajax_nopriv_get_product_by_slug', 'get_product_by_slug_ajax');