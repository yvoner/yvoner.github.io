<?php

session_start();

include $_SERVER['DOCUMENT_ROOT']."/includes/Bitrix24.php";

function send_bitrix24()
{
	$parts = parse_url($_SERVER['HTTP_REFERER']);
	parse_str($parts['query'], $GET);

    $data      = [
        'LOGIN'             => 'solovievv57@gmail.com',
        'PASSWORD'          => '7ccQPbMX',

        'TITLE'             => $_SESSION['__udata']['name'], //
        'STATUS_ID'         => 'IN_PROCESS', //
        'NAME'              => $_SESSION['__udata']['name'], //
        'EMAIL'             => [
            'n0' => [
                'VALUE' => $_SESSION['__udata']['email'],
                'VALUE_TYPE' => 'WORK',
            ],
        ],
        'PHONE'             => [
            'n0' => [
                'VALUE' => $_SESSION['__udata']['phone'],
                'VALUE_TYPE' => 'WORK',
            ],
        ],
		'ASSIGNED_BY_ID'    => '15', //
		'UF_CRM_1591362856' => $_SERVER['HTTP_HOST'], //
		'UF_CRM_1591360706' => '57', //
		'UF_CRM_1591361670' => $_POST['countryName'], //
		
		//'UTM_SOURCE' => (isset($_SESSION['__udata']['utm_source']) && $_SESSION['__udata']['utm_source']) ? $_SESSION['__udata']['utm_source'] : isset($GET['utm_source']) ? $GET['utm_source'] : '', //
		//'UTM_CAMPAIGN' => (isset($_SESSION['__udata']['utm_campaign']) && $_SESSION['__udata']['utm_campaign']) ? $_SESSION['__udata']['utm_campaign'] : isset($GET['utm_campaign']) ? $GET['utm_campaign'] : '', //
		//'UTM_MEDIUM' => (isset($_SESSION['__udata']['utm_medium']) && $_SESSION['__udata']['utm_medium']) ? $_SESSION['__udata']['utm_medium'] : isset($GET['utm_medium']) ? $GET['utm_medium'] : '', //
		//'UTM_CONTENT' => (isset($_SESSION['__udata']['utm_content']) && $_SESSION['__udata']['utm_content']) ? $_SESSION['__udata']['utm_content'] : isset($GET['utm_content']) ? $GET['utm_content'] : '', //
		//'UTM_TERM' => (isset($_SESSION['__udata']['utm_term']) && $_SESSION['__udata']['utm_term']) ? $_SESSION['__udata']['utm_term'] : isset($GET['utm_term']) ? $GET['utm_term'] : '', //

                                    'UTM_SOURCE' => $_SESSION['__udata']['utm_source'], //
		'UTM_CAMPAIGN' => $_SESSION['__udata']['utm_campaign'], //
		'UTM_MEDIUM' => $_SESSION['__udata']['utm_medium'], //
		'UTM_CONTENT' => $_SESSION['__udata']['utm_content'], //
		'UTM_TERM' => $_SESSION['__udata']['utm_term'], //
    ];
	
	//var_dump($_SESSION['__udata']); die();

    $b24 = new Bitrix24(
        'https://refund.bitrix24.ru',
        1,
        'w11k2rnxbundqa0c');

    // see "crm.lead.add"
    $b24->crmLeadAdd([
        "fields" => $data,
//        'params' => ["REGISTER_SONET_EVENT" => "Y"],
    ]);

    return [];
}

$wetrafficasa = send_bitrix24();
$wetrafficasa = json_decode($wetrafficasa);

$check = [];
$check['exist'] = false;
$check['redirect'] = 'https://argonteshop.myshopify.com/pages/success';
session_destroy();

$errors = [
    'Phone Number is not valid',
    'Phone number is mandatory, please check the field',
    'Could not interpret numbers after plus-sign',
    'The string supplied did not seem to be a phone number'
];