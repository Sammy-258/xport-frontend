<?php

    require_once('app/controller.php');
    require_once("app/model.php");

  class viewController extends controller
  {
    public function logout($file, $data){
        session_start();
        session_destroy();

        $response = array(
            'status' => 'success',
            'message' => 'You have successfully logout.'
        );

        echo json_encode($response);
    }
    public function dash(){
      session_start();
      if(isset($_SESSION["google_account_info"])){
        var_dump($_SESSION["google_account_info"]);
      }else{
        header("location: ./");
      }
      
    }

    public function adminlogin($file, $data){
      require_once("views/adminlogin.php");
    }

    // public function register($path, $data, $file){
    //   require_once("views/register.php");
    // }
    
    
    public function services($path, $data, $file){
      require_once("views/our-services.html");
    }
    
    public function PasswordReset(){
      require_once("views/PasswordReset.php");
    }

    
    public function confirmPassword($file, $data){
      require_once("views/confirmPassword.php");
    }
    
    
    
  }