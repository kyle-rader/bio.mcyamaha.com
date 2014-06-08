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

<div class="row">
	<div class="large-12 columns">
		A project on HIV consensus variation.<hr>
		<a href="/hiv_data.php">HIV Data</a>
	</div>
</div>

