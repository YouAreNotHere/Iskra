<?php
function render_react_app() {
    ob_start();
    ?>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/react-app/index-B1qg89wD.css">
    <div id="root"></div>
    <script src="<?php echo get_template_directory_uri(); ?>/react-app/index-DLmJHYCU.js"></script>
    <?php
    return ob_get_clean();
}
add_shortcode('react_app', 'render_react_app');