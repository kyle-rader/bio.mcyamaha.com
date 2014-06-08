<?php 
include_once("include/top_app.inc");
include_once("$root/database/hiv_data.php");

$title = <<<EOT
			<h2>CSCI 474 Bioinformatics</h2>
			<small>HIV Variations Project</small>
EOT;
print PageTitle($title);
?>
<style>
<?php include_once("css/home.css"); ?>
</style>
<script>
var _data = <?php print json_encode(GetHIVData($mysqli)); ?>;
</script>
<div class="row-wide">
     <div class="sequence-data">
     </div>
</div>
<script>
<?php //include_once("js/home.js"); ?>
</script>
