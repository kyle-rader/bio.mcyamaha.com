<?php 
$baseInclude = $_SERVER['DOCUMENT_ROOT'];
$page_title = $_SERVER['REQUEST_URI'];

include_once "$baseInclude/include/functions.inc";
include_once "$baseInclude/include/db.inc";
include_once "$baseInclude/database/hiv_data.php";
$page_title = 'CSCI 474 S14 HIV';

?>

<!DOCTYPE html>
<html>
<?php 
include_once "$baseInclude/include/header.inc";
?>

<body>
	<div class="row-wide">
		<div class="sequence-data-1">
		  <h5>100% Consensus</h5>
		</div>
		<div class="sequence-data-2">
		  <h5>90% Consensus</h5>
		</div>
		<div class="sequence-data-3">
		  <h5>80% Consensus</h5>
		</div>
		<div class="sequence-data-4">
		  <h5>70% Consensus</h5>
		</div>
		<div class="sequence-data-5">
		  <h5>50% Consensus</h5>
		</div>
	</div>
</body>
<script>
$(document).ready(function() {
	readyFunction();
});

var _data = <?php print json_encode(GetHIVData($mysqli)); ?>;
var _proteinData = <?php print json_encode(GetProteinData($mysqli)); ?>
<?php include_once("hiv.js"); ?>
</script>
</html>
