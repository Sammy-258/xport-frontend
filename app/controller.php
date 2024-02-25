<?php
    require_once('config.php');
    require_once("app/model.php");

    class controller{
        protected $pdo;
        

        public function __construct(){
            $this->pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
        }

        public function userLogin($file, $data){

            // API endpoint URL
            $apiUrl = 'https://server.eportglobals.com/userLogin';

            // Extract data from $_POST
            $email = $data['email'];
            $password = $data['password'];
           

            // Prepare data to be sent
            $data = array(
                'email' => $email,
                'password' => $password,
                
            );

            // Headers for the request
            $headers = array(
                'Content-Type: application/json'
            );

            // Initialize cURL session
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            // Execute cURL request
            $response = curl_exec($ch);
            
            // Check for errors
            if(curl_errno($ch)) {
                echo 'Error: ' . curl_error($ch);
            } else {
                // Print response or handle as needed
                // echo 'Response: ' . $response;
                $responseData = json_decode($response, true);
                session_start();

                // var_dump($_SESSION["responses"]);
                if($responseData["status"] == "failed"){
                    $status = $responseData['status'];
                    $message = $responseData['message'];
                    
                    $_SESSION["responses"] = $responseData;
                    header("location: Login");
                }else{
                    $_SESSION["user_data"] = $responseData;
                    var_dump($_SESSION["user_data"]);
                }
                
            }
            
            // Close cURL session
            curl_close($ch);


        }

        public function userRegistration($file, $data){

            // API endpoint URL
            $apiUrl = 'https://server.eportglobals.com/userRegistration';

            // Extract data from $_POST
            $email = $data['email'];
            $first_name = $data['firstname'];
            $last_name = $data['lastname'];
            $password = $data['password'];
           

            // Prepare data to be sent
            $data = array(
                'email' => $email,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'password' => $password,
                
            );

            // Headers for the request
            $headers = array(
                'Content-Type: application/json'
            );

            // Initialize cURL session
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            // Execute cURL request
            $response = curl_exec($ch);
            
            // Check for errors
            if(curl_errno($ch)) {
                echo 'Error: ' . curl_error($ch);
            } else {
                // Print response or handle as needed
                // echo 'Response: ' . $response;
                $responseData = json_decode($response, true);
                $status = $responseData['status'];
                $message = $responseData['message'];
                session_start();
                $_SESSION["responses"] = $responseData;
                

                // var_dump($_SESSION["responses"]);
                if($_SESSION["responses"]["status"] == "failed"){
                    $_SESSION["former_data"] = $data;
                    header("location: registration");
                }else{
                    // var_dump($responseData);
                    $_SESSION["user_data"] = $responseData;
                    var_dump($_SESSION["user_data"]);
                }
                
            }
            
            // Close cURL session
            curl_close($ch);


        }

        public function adminlogin($file, $data){
            $apiUrl = 'https://server.eportglobals.com/adminLogin';

            // Extract data from $_POST
            $company_user_name = $data['company_user_name'];
            $password = $data['password'];
           

            // Prepare data to be sent
            $data = array(
                'company_user_name' => $company_user_name,
                'password' => $password,
                
            );

            // Headers for the request
            $headers = array(
                'Content-Type: application/json'
            );

            // Initialize cURL session
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            // Execute cURL request
            $response = curl_exec($ch);
            
            // Check for errors
            if(curl_errno($ch)) {
                echo 'Error: ' . curl_error($ch);
            } else {
                // Print response or handle as needed
                // echo 'Response: ' . $response;
                $responseData = json_decode($response, true);
                session_start();

                // var_dump($_SESSION["responses"]);
                if($responseData["status"] == "failed"){
                    $status = $responseData['status'];
                    $message = $responseData['message'];
                    
                    $_SESSION["responses"] = $responseData;
                    header("location: Login");
                }else{
                    $_SESSION["user_data"] = $responseData;
                    var_dump($_SESSION["user_data"]);
                }
                
            }
            
            // Close cURL session
            curl_close($ch);
        }

        public function userPasswordReset($file, $data){
            $userPasswordReset = new Model($this->pdo);
            $userPasswordReset = $userPasswordReset->userPasswordReset($data);

            
            if($userPasswordReset["status"]=="success"){
                session_start();
                $_SESSION["reset_password"] = $userPasswordReset["reset_code"];
                $_SESSION["user_email"] = $userPasswordReset["email"];
                $_SESSION["responses"] = $userPasswordReset;

                if(isset($_SESSION["reset_password"])){
                    // echo json_encode($userPasswordReset);
                    header("location: PasswordReset");
                }

            }else{
                session_start();
                $_SESSION["responses"] = $userPasswordReset;
                header("location: Login");
                // var_dump($_SESSION["response"]);
            }
        }

        public function index(){
            require_once("views/index.html");
        }

        public function PasswordResetSecond($file, $data){
            session_start();
            if(empty($data["reset_code"])){
                header("HTTP/1.0 400 Bad Request");
                $response = array(
                    'status' => 'failed',
                    'message' => 'reset_code field is required.'
                );
                // echo json_encode($response);
                $_SESSION["responses"] = $response;
                header("location: PasswordReset");
            }else{
                $reset_code = $data["reset_code"];
                if($reset_code !== $_SESSION["reset_password"]){
                    $response = array(
                        'status' => 'failed',
                        'message' => 'reset_code you entered does not match with the one given.',
                        'code' => $_SESSION["reset_password"]
                    );
                    // echo json_encode($response);
                    $_SESSION["responses"] = $response;
                    header("location: PasswordReset");
                }else{
                    $_SESSION["reset_status"] = 1;
                    $response = array(
                        'status' => 'success',
                        'message' => 'reset_code you entered matchs with the one given.'
                    );
                    
                    // echo json_encode($response);
                    header("location: confirmPassword");
                }
                // echo json_encode();
            }
        }

        public function confirmPassword($file, $data){
            session_start();
            if(empty($data["password"])){
                header("HTTP/1.0 400 Bad Request");
                $response = array(
                    'status' => 'failed',
                    'message' => 'password feild is required.'
                );
                echo json_encode($response);
            }else{
                $password = $data["password"];
                if(empty($_SESSION["reset_status"])){
                    $response = array(
                        'status' => 'failed',
                        'message' => 'your Dont have a reset status.'
                    );
                    echo json_encode($response);
                }else{
                    $email =  $_SESSION["user_email"];
                    $confirmPassword = new Model($this->pdo);
                    $confirmPassword = $confirmPassword->confirmPassword($email, $password);
                   
                    
                    echo json_encode($confirmPassword);
                }
               
            }
        }
       
    }