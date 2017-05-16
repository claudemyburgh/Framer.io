<?php

  $icons = [
    'arrow-down',
    'arrow-left',
    'arrow-right',
    'arrow-up',
    'bell',
    'close',
    'cloud-down',
    'cloud-up',
    'cloud',
    'drop',
    'ellipsis-h',
    'ellipsis-v',
    'grid',
    'list',
    'long-arrow-down',
    'long-arrow-left',
    'long-arrow-right',
    'long-arrow-up',
    'marker',
    'microphone',
    'nav',
    'phone',
    'search',
    'star-half',
    'star-o',
    'star',
    'user',
    'whatsapp',
    'envelope'
  ];


?>


<div class="wrapper">
  <div class="row">
    <div class="column">
      <div class=" card">
        <div class="card__body">

          <?php foreach($icons as $icon): ?>
            <div class="btn btn--white" title="<?= $icon; ?>"><i class="fr fr-<?= $icon; ?>"></i></div>
          <?php endforeach; ?>

        </div>
      </div>
    </div>
  </div>
</div>
