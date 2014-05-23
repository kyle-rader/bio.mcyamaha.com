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
		$stmt->bind_result($id, $year, $consensus, $threshold, $description, $sequence);
		while($stmt->fetch())
		{
			$data[] = Array('id' => $id,
				   'year' => $year,
				   'description' => $description,
				   'sequence' => $sequence);
		}
		$stmt->close();
	}
	return $data;
}
?>
