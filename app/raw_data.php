<?php 
include_once("../include/db.inc");
include_once("../database/hiv_data.php");

$title = <<<EOT
			<h2>Raw HIV Consensus Data</h2>
			<small>HIV Variations Project</small>
EOT;
print PageTitle($title);

$hiv_data = GetHIVData($mysqli);

?>
<div class="row">
	<div class="large-12 columns">
		<h4>HIV 1 Subtype B (North America)</h4>
		<small>Hold shift while scrolling to scroll through the sequence</small>
	</div>
</div>
<br>
<div class="row-wide">
     <div class="raw-data">
       <?php
	  if(count($hiv_data) > 0) {
       ?>
       <table>
	 <thead><tr><th class="fixed-head">Description</th><th class="long">Sequence</th></tr></thead>
	 <tbody>
	   <?php
	      foreach($hiv_data as $hiv) {
	         print "<tr><td class=\"fixed-head\">{$hiv['description']}</td><td class=\"long\">{$hiv['sequence']}</td></tr>";
	      }
	   ?>
	 </tbody>
       </table>
       <?php } else { print 'No Data Found!'; } ?>
     </div>
</div>
