<?php
function enqueue_react_app_assets() {

    wp_enqueue_style('react-app-styles', get_template_directory_uri() . '/style.css');

    wp_enqueue_script('react-app-scripts', get_template_directory_uri() . '/script.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_react_app_assets');

function allow_cors() {
    header("Access-Control-Allow-Origin: http://localhost:5173"); 
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true"); 

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit(); 
    }
}
add_action('init', 'allow_cors');

require_once get_template_directory() . '/inc/add-to-cart.php';
require_once get_template_directory() . '/inc/all-products.php';
require_once get_template_directory() . '/inc/cart-products.php';
require_once get_template_directory() . '/inc/current-product.php';
require_once get_template_directory() . '/inc/decrease-cart-product.php';
require_once get_template_directory() . '/inc/increase-cart-product.php';
require_once get_template_directory() . '/inc/remove-cart-product.php';
require_once get_template_directory() . '/inc/get-order-products.php';
require_once get_template_directory() . '/inc/post-order.php';
require_once get_template_directory() . '/inc/get-page-content.php';
require_once get_template_directory() . '/inc/get-news-page.php';
require_once get_template_directory() . '/inc/get-cache.php';
require_once get_template_directory() . '/inc/get-cart-products-quantity.php';
require_once get_template_directory() . '/inc/get-all-products.php';