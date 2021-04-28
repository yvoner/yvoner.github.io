<?php

function send_wetrafficasa()
{
	$parts = parse_url($_SERVER['HTTP_REFERER']);
	parse_str($parts['query'], $GET);

    $api_url = 'https://platform.pmatracker.com/api/signup/procform';
    $jsonObj = array(
        "ai"     => '2958031',
        "ci"     => '1',
        "gi"     => '17',
        "userip" => $_SERVER["REMOTE_ADDR"],
        "firstname" => $_SESSION['__udata']['name'],
        "lastname" => $_SESSION['__udata']['secondname'],
        "email" => $_SESSION['__udata']['email'],
        "phone" => $_SESSION['__udata']['phone'],
        "password" => '4v%MA4H6ROMurjfL#kW6',
        'sub' => $_SESSION['__udata']['utm_source'], //
        "MPC_1" => $GET['MPC_1'] ? $GET['MPC_1'] : '',
        "MPC_2" => $GET['MPC_2'] ? $GET['MPC_2'] : '',
        "MPC_3" => $GET['MPC_3'] ? $GET['MPC_3'] : '',
        "MPC_4" => $_SERVER['SERVER_NAME'],
		'MPC_5' => $_SESSION['__udata']['utm_campaign'], //
		'MPC_6' => $_SESSION['__udata']['utm_medium'], //
		'MPC_7' => $_SESSION['__udata']['utm_content'], //
		'MPC_8' => $_SESSION['__udata']['utm_term'], //
        "MPC_9" => $GET['MPC_9'] ? $GET['MPC_9'] : '',
        'MPC_10' => $GET['MPC_10'] ? $GET['MPC_10'] : '',
        "fallback" => "false",
        "source" => $_SERVER['SERVER_NAME']
    );

    $curl = curl_init($api_url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($jsonObj));
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "cache-control: no-cache",
        "content-type: application/json",
        "x-api-key: 2643889w34df345676ssdas323tgc738",
        "x-trackbox-password:4MxfPfDVs8KxaQ9E",
        "x-trackbox-username:Khan"
    ));

    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

$wetrafficasa = send_wetrafficasa();
$wetrafficasa = json_decode($wetrafficasa);

if (!$wetrafficasa->status){
    $check = [];
    $check['exist'] = true;
    $check['errorMessage'] = $wetrafficasa->data;

}
else {
    $check = [];
    $check['exist'] = false;
    $check['redirect'] = './thank-you.html';
}