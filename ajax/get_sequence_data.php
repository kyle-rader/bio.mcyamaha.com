<?php
include_once "include/top_ajax.inc";
include_once "$baseInclude/functions.inc";
include_once "$baseInclude/db.inc";

if ($_SERVER['REQUEST_METHOD'] != 'POST')
{
	header("HTTP/1.0 400 Wrong Request Type.");
	exit();
}
else if (!isset($_POST['year']))
{
	header("HTTP/1.0 400 Missing 'year' Query String.");
	exit();
}

$year = $_POST['year'];

//$hiv_type = $_POST['hiv_type'];
$data = [];

$sql = <<<EOT
SELECT *, CHAR_LENGTH(sequence) char_count FROM sequence
WHERE consensus = 1 AND subtype = 'B' AND YEAR = ?;
EOT;

if($stmt = $mysqli->prepare($sql))
{
	$stmt->bind_param("s", $year);
	$stmt->execute();
	$stmt->bind_result($id, $subtype, $year, $consensus, $threshold, $description, $sequence, $count);
	while($stmt->fetch())
	{
		$data["$threshold"] =  Array('id' => $id,
		      	      'year' => $year,
			      'threshold' => $threshold,
			      'description' => $description,
			      'count' => $count,
			      'sequence' => $sequence);
	}
	$stmt->close();
}

print json_encode($data);
?>
