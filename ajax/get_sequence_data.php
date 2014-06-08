<?php
include_once "include/top_ajax.inc";
include_once "$baseInclude/functions.inc";
include_once "$baseInclude/db.inc";

if ($_SERVER['REQUEST_METHOD'] != 'POST')
{
	header("HTTP/1.0 400 Wrong Request Type.");
	exit();
}

$data = [];

$sql = <<<EOT
SELECT *, CHAR_LENGTH(sequence) char_count FROM sequence
WHERE consensus = 1 AND subtype = 'B';
EOT;

if($stmt = $mysqli->prepare($sql))
{
	$stmt->execute();
	$stmt->bind_result($id, $subtype, $year, $consensus, $threshold, $georegion, $country, $description, $sequence, $count);
	while($stmt->fetch())
	{
		$data["$year.$threshold"] =  Array('id' => $id,
		      	      'year' => $year,
			      'georegion' => $georegion,
			      'country' => $country,
			      'threshold' => $threshold,
			      'description' => $description,
			      'count' => $count,
			      'sequence' => $sequence);
	}
	$stmt->close();
}

print json_encode($data);
?>
