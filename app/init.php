<?php

require_once("Router.php");





// // logout route
// Router::get('/logout', "postController", "logout");
Router::get("/", "controller", "index");
Router::get("/services", "viewController", "services");

Router::get("/dash", "viewController", "dash");
Router::get("/adminlogin", "viewController", "adminlogin");
Router::get("/adminlogin", "viewController", "adminlogin");
// Router::get("/register", "viewController", "register");
Router::get("/PasswordReset", "viewController", "PasswordReset");
Router::get("/confirmPassword", "viewController", "confirmPassword");


Router::post("/userLogin", "postController", "userLogin");
Router::post("/userRegistration", "postController", "userRegistration");
Router::post("/adminregister", "postController", "adminregister");
Router::post("/adminlogin", "postController", "adminlogin");
Router::post("/userPasswordReset", "postController", "userPasswordReset");
Router::post("/PasswordResetSecond", "postController", "PasswordResetSecond");
Router::post("/confirmPassword", "postController", "confirmPassword");








// not found 
header("HTTP/1.0 404 Not Found");
$response = array(
    'status' => 'success',
    'message' => 'this route is not found on this server'
);

echo json_encode($response);
exit();