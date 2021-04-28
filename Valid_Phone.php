<?php
// set API Access Key
$access_key = '5f2baec6716d8ba35d741b38fe4afb58';

// set phone number
//$phone_number = '496580856511';
$phone_number = $_POST['phone'];

// Initialize CURL:
$ch = curl_init('http://apilayer.net/api/validate?access_key='.$access_key.'&number='.$phone_number.'');  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Store the data:
$json = curl_exec($ch);
curl_close($ch);

// Decode JSON response:
$validationResult = json_decode($json, true);

echo $json;

// Access and use your preferred validation result objects
//$validationResult['valid'];
//$validationResult['country_code'];
//$validationResult['carrier'];