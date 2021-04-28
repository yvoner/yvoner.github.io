<?php

require_once 'IP2Location.php';
/*
   Cache whole database into system memory and share among other scripts & websites
   WARNING: Please make sure your system have sufficient RAM to enable this feature
*/
// $db = new \IP2Location\Database('./databases/IP-COUNTRY-SAMPLE.BIN', \IP2Location\Database::SHARED_MEMORY);

/*
   Cache the database into memory to accelerate lookup speed
   WARNING: Please make sure your system have sufficient RAM to enable this feature
*/
// $db = new \IP2Location\Database('./databases/IP-COUNTRY-SAMPLE.BIN', \IP2Location\Database::MEMORY_CACHE);


/*
	Default file I/O lookup
*/
/*HOST*/

$db = new \IP2Location\Database('ip2location-lite-db11.ipv6.bin', \IP2Location\Database::FILE_IO);

if (isset($_SERVER['HTTP_X_REAL_IP'])) {
    $called_ip = $_SERVER['HTTP_X_REAL_IP'];
} elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $called_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $called_ip = $_SERVER['REMOTE_ADDR'];
}

//$called_ip = '2a02:908:952:5540:846d:6513:e10f:efdc';
$countryCode = $db->lookup($called_ip, \IP2Location\Database::ALL);

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	echo json_encode(['code' => $countryCode['countryCode']]);
} else {
	return json_encode(['code' => $countryCode['countryCode']]);
}


/*echo '<pre>';
echo 'IP Number             : ' . $records['ipNumber'] . "\n";
echo 'IP Version            : ' . $records['ipVersion'] . "\n";
echo 'IP Address            : ' . $records['ipAddress'] . "\n";
echo 'Country Code          : ' . $records['countryCode'] . "\n";
echo 'Country Name          : ' . $records['countryName'] . "\n";
echo '</pre>';*/
?>
