<?php 
$title = <<<EOT
			<h2>CSCI 474 Bioinformatics</h2>
			<small>HIV Variations Project</small>
EOT;
print PageTitle($title);
?>
<style>
<?php include_once("css/home.css"); ?>
</style>
<div class="row-wide">
     <div class="sequence-data">
		<svg class="chart"></svg>
     </div>
</div>
<script>
<?php include_once("js/home.js"); ?>
</script>
