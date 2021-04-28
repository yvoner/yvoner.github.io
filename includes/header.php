<?php

$url_get = explode('/?',$_SERVER['REQUEST_URI']);

if(!empty($_GET)){
    foreach ($_GET as $name => $key){
        $_SESSION['__udata'][$name] = $key;
    }

    header($url);
    exit();
}


