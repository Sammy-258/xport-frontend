<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xport | Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
        .content{
            background-image: linear-gradient(to right, rgba(62, 153, 193, 0.8) 50%, rgba(62, 153, 193, 0.8) 50%), url('./img/bg/regbg.jpg');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            width: 100vw;
            height: 100vh;
        }
        .formbox{
            background-color: #fff;
            display: grid;
            place-content: center;
            position: relative;
        }
        input{
            height: 45px;
            cursor: text;
            border: 3px solid #f4f7f9;
            color: #959899;
            outline: none;
        }
        #check{
            height: auto;
            cursor: pointer;
        }
        .log{
            width: 95%;
            background-color: #eeba00;
            padding: 10px 0;
            outline: none;
            color: #fff;
            border: none;
            cursor: pointer;
        }
        .google{
            background-color: #E9EAF2;
            width: 95%;
            padding: 5px 0;
            outline: none;
            border: none;
            cursor: pointer;
        }
        .gicon{
            width: 35px;
        }
        .xlogo{
            position: absolute;
            top: 0;
            left: 0;
            width: 90px;
        }
        @media(max-width: 1024px){
            .content{
                display: grid;
                place-content: center;
            }
        }
        @media(max-width: 767px){
            .content{
                display: block;
            }
        }
        a{
            text-decoration:none;
        }
    </style>
</head>
<body>
    <div class="content overflow-x-hidden">
        <div class="pt-lg-3 pt-3 pt-md-0">
            <h2 class="text-center fw-bold mb-4 text-white">Register With Us!</h2>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-8">
                        <div class="formbox w-100 p-lg-5 py-5">
                            <img src="views/img/icon/xportlogo.jpg" alt="" class="xlogo">
                            <form action="userRegistration" method="post">
                                <div class="px-lg-5 px-4">
                                    <p class="text-center fw-bold mt-5 mt-md-0">Already have an account? <a href="Login">Log In Now</a></p>
                                    <div class="row justify-content-center">
                                    <div class="row">
                                        <div class="col-6 p-0 d-flex flex-column">
                                            <label for="length" class="pb-1 fw-bold" value="">Firstname</label>
                                            
                                            <input type="text" name="firstname" class="w-100" required>
                                        </div>
                                        <div class="col-6 p-0 d-flex flex-column">
                                            <label for="length" class="pb-1 fw-bold">lastname</label>
                                            
                                            <input type="text" name="lastname" class="w-100" required>
                                        </div>
                                                                       
                                    </div>
                                       
                                        <div class="col-12 gy-3">
                                            <label for="email" class="pb-1 fw-bold">Email Address</label>
                                        </div>
                                        <div class="col-12">
                                            <input type="email" name="email" class="w-100" required>
                                        </div>
                                        <div class="col-12 gy-3">
                                            <label for="password" class="pb-1 fw-bold">Create Password</label>
                                        </div>
                                        <div class="col-12">
                                            <input type="password" name="password" class="w-100" required>
                                        </div>
                
                                        <div class="d-flex justify-content-between my-3">
                                            <div class="rmb">
                                                <input type="checkbox" id="check">
                                                <small class="fw-bold text-secondary">Remember Me</small>
                                            </div>
                                            
                                        </div>
                                        
                                        <button type="submit" class="log fw-bold">Register</button>

                                        <?php
                                            
                                            echo "<a class='google mt-4 fw-bold text-center text-black' href='".$client->createAuthUrl()."'><span><img src='views/img/icon/gicon.svg' alt='' class='gicon'></span>Continue with google</a>";
                                        ?>
                                        <?php

                                            if(isset($_SESSION["responses"]["message"])){
                                                ?>
                                                <p class="text-center text-danger fw-bold mt-2"><?=$_SESSION["responses"]["message"]?></p>
                                                <?php
                                            }
                                        ?>
                                        
                                    </div>
                                </div>
                            </form>
                        </div>
        
                    </div>
                </div>
    
            </div>
        </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>