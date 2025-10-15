<?php
get_header();
?>

<div id="root">
  <?php echo file_get_contents(get_template_directory() . "/index.html"); ?>
</div>
<!-- <script>
  document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');
    if (root) {
      include_once(get_template_directory() . '/index.html');
    }
  });
</script> -->

<?php
get_footer(); // Подключаем подвал темы
?>