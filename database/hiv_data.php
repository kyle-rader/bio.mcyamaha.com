<?php

function GetHIVData($mysqli) 
{
	$data = Array("1.00" => Array(), "0.90" => Array(), "0.80" => Array(), "0.70" => Array(), "0.50" => Array());
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

function GetProteinData($mysqli)
{
	$data = Array();
	$sql = <<<EOT
SELECT
P.HXB2_Position, P.protein,
'start' AS q
FROM
Proteins P
INNER JOIN Proteins PE
ON (PE.HXB2_Position = P.HXB2_Position - 1)
WHERE
(PE.protein != P.protein)

UNION

SELECT
P.HXB2_Position, P.protein,
'end' AS q
FROM
Proteins P
INNER JOIN Proteins PS
ON (PS.HXB2_Position = P.HXB2_Position + 1)
WHERE
(PS.protein != P.protein)

ORDER BY
HXB2_Position;

EOT;

	if($stmt = $mysqli->prepare($sql))
	{
		$stmt->execute();
		$stmt-> bind_result($position, $protein, $tag);
		while($stmt->fetch())
		{
			$data[] = Array('position' => $position,
					'protein' =>$protein,
					'tag' => $tag);
		}//end while
	}//end if
	return $data;
}//end getProteinData
?>
