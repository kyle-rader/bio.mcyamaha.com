<?php

function GetHIVData($mysqli) 
{
	$data = Array( "0.50" => Array(), "0.70" => Array(), "0.80" => Array(), "0.90" => Array(), "1.00" => Array());
	$sql = <<<EOT
SELECT * FROM sequence
WHERE consensus = 1 AND subtype = 'B'
ORDER BY year DESC;
EOT;

	if($stmt = $mysqli->prepare($sql))
	{
		$stmt->execute();
		$stmt->bind_result($id, $subtype, $year, $consensus, $threshold, $georegion, $country, $description, $sequence);
		while($stmt->fetch())
		{
			$data[$threshold][$year] = Array('id' => $id,
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
