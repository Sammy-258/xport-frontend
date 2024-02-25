<?php



class Router
    {
        public static function handle($method="", $path="", $controller="", $action=""){
            $current_method = $_SERVER["REQUEST_METHOD"];
            $current_uri = $_SERVER["REQUEST_URI"];

            if($current_method !== $method){
                return false;
            }else{
                $parent_uri = "/PHP_SIGN_IN";
                $local_uri = '#^'.$parent_uri.$path.'$#siD';
                $other_uri = '#^'.$parent_uri.$path.'/(?:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|([0-9]+))$#siD';
                if(preg_match($local_uri, $current_uri)){
                    if($path==="/"){
                        require_once("$controller.php");
                        if (class_exists($controller)) {
                            $controllerInstance = new $controller;
        
                            if (method_exists($controllerInstance, $action)) {
                                $controllerInstance->$action($path, $_POST);
                                exit();
                            } else {
                                die("Action not found");
                            }
                        }else {
                            die("Controller not found");
                        }
                    }elseif ($path==="/adminRegister") {
                        require_once("$controller.php");
                        if (class_exists($controller)) {
                            $controllerInstance = new $controller;
        
                            if (method_exists($controllerInstance, $action)) {
                                $controllerInstance->$action($path, $_POST, $_FILES);
                                exit();
                            } else {
                                die("Action not found");
                            }
                        }else {
                            die("Controller not found");
                        }
                    }elseif ($path==="/userProfileRegistration" || $path ==="/adminLogin") {
                        require_once("$controller.php");
                        if (class_exists($controller)) {
                            $controllerInstance = new $controller;
        
                            if (method_exists($controllerInstance, $action)) {
                                $controllerInstance->$action($path, $_POST);
                                exit();
                            } else {
                                die("Action not found");
                            }
                        }else {
                            die("Controller not found");
                        }
                    }elseif (isset($_FILES)) {
                        require_once("controller/$controller.php");
                        if (class_exists($controller)) {
                            $controllerInstance = new $controller;
        
                            if (method_exists($controllerInstance, $action)) {
                                $controllerInstance->$action($path, $_POST, $_FILES);
                                exit();
                            } else {
                                die("Action not found");
                            }
                        } else {
                            die("Controller not found");
                        }
                    }
                    require_once("controller/$controller.php");
                    if (class_exists($controller)) {
                        $controllerInstance = new $controller;
    
                        if (method_exists($controllerInstance, $action)) {
                            $controllerInstance->$action($path, $_POST);
                            exit();
                        } else {
                            die("Action not found");
                        }
                    } else {
                        die("Controller not found");
                    }
                }
                
            }
            
        }

        public static function get($path="", $controller="", $action=""){
            return self::handle('GET', $path, $controller, $action);
        }

        public static function post($path="", $controller="", $action=""){
            return self::handle('POST', $path, $controller, $action);
        }
    }