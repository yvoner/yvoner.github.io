<?php
// set API Access Key
$access_key = 'e379f6ea1a19a4b200a927a5703b30f1';

// set email address
// $email_address = 'support@polish-studio.club';
$email_address = $_POST['email'];

// Initialize CURL:
$ch = curl_init('http://apilayer.net/api/check?access_key='.$access_key.'&email='.$email_address.'');  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Store the data:
$json = curl_exec($ch);
curl_close($ch);

// Decode JSON response:
$validationResult = json_decode($json, true);

echo $json;

// Access and use your preferred validation result objects
//$validationResult['format_valid'];
//$validationResult['smtp_check'];
//$validationResult['score'];