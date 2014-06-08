<?php

function GetHIVData($mysqli) 
{
	$data = Array();
	$sql = <<<EOT
SELECT * FROM sequence
WHERE consensus = 1
ORDER BY year DESC;
EOT;

	if($stmt = $mysqli->prepare($sql))
	{
		$stmt->execute();
		$stmt->bind_result($id, $subtype, $year, $consensus, $threshold, $georegion, $country, $description, $sequence);
		while($stmt->fetch())
		{
			$data[] = Array('id' => $id,
				   'subtype' => $subtype,
				   'year' => $year,
				   'country' => $country, 
				   'georegion' => $georegion,
				   'description' => $description,
				   'sequence' => $sequence);
		}
		$stmt->close();
	}
	return $data;
}
?>
