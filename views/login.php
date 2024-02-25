<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xport | Login Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/d2bf8c275f.js" crossorigin="anonymous"></script>
    <style>
        .content{
            background-image: linear-gradient(to right, rgba(62, 153, 193, 0.8) 50%, rgba(62, 153, 193, 0.8) 50%), url('views/img/bg/regbg.jpg');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            width: 100vw;
            height: 100vh;
            display: grid;
            place-content: center;
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
        a{
            text-decoration:none;
        }
        /* The Modal (background) */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
        }
        #modalBtn {
            cursor:pointer;
        }

        /* Modal Content/Box */
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 50%;
        }
        @media(max-width:500px){
            .modal-content {
                background-color: #fefefe;
                margin: 15% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 80%;
            }
        }

        /* Close Button */
        .close {
            color: #aaa;
            float: left !important;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

    </style>
</head>

<body>
    <div class="content overflow-x-hidden">
        <h2 class="text-center fw-bold mb-4 text-white">Welcome Back!</h2>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="formbox w-100 p-lg-5 py-5">
                        <img src="views/img/icon/xportlogo.jpg" alt="" class="xlogo">
                        <?php
                           

                            if(isset($_SESSION["responses"]["message"]) && $_SESSION["responses"]["status"] == "failed"){
                                $message = $_SESSION["responses"]["message"];
                                // session_destroy();
                                unset($_SESSION["responses"]);
                            }else{
                                $message = "";
                            }
                            

                        ?>
                        <form action="userlogin" method="post">
                            <div class="px-lg-5 px-4">
                                <p class="text-center fw-bold mt-5 mt-md-0">Don't have an account? <a href="register">Register Now</a></p>
                                <div class="row justify-content-center">
                                    <div class="col-12">
                                        <label for="email" class="pb-1 fw-bold">email</label>
                                    </div>
                                    <div class="col-12">
                                        <input type="text" name="email" class="w-100" required>
                                    </div>
                  
                                    <div class="col-12 gy-3">
                                        <label for="password" class="pb-1 fw-bold">Password</label>
                                    </div>
                                    <div class="col-12">
                                        <input type="password" name="password" class="w-100" required>
                                    </div>
            
                                    <div class="d-flex justify-content-between my-3">
                                        <div class="rmb">
                                            <input type="checkbox" id="check">
                                            <small class="fw-bold text-secondary">Remember Me</small>
                                        </div>
                                        <p style="color:blue;"  id="modalBtn" class="fw-bold">Forgot Password</p>
                                    </div>
                                    
                                    <button class="log fw-bold">Log in</button>

                                    <!-- <a href='".$client->createAuthUrl()."'><button class="google mt-4 fw-bold"> <span><img src="views/img/icon/gicon.svg" alt="" class="gicon"></span> Continue with google</button></a> -->
                                    <?php
                                        echo "<a class='google mt-4 fw-bold text-center text-black' href='".$client->createAuthUrl()."'><span><img src='views/img/icon/gicon.svg' alt='' class='gicon'></span>Continue with google</a>";
                                    ?>
                                 
                                        <p class="text-center text-danger fw-bold mt-2"><?=$message?></p>
                                           

                                    <p class="text-center fw-bold mt-4">Proceed as an <a href="adminlogin">Admin</a></p>
                                </div>
                            </div>
                        </form>
                        

                            <!-- The Modal -->
                        <div id="myModal" class="modal">

                            <!-- Modal content -->
                            <div class="modal-content">
                                <div class="d-flex justify-content-end">
                                <span class="close">&times;</span>
                                </div>
                                
                                <form action="userPasswordReset" method="post">
                                    <div class="px-lg-5 px-4">
                                        <p class="text-center fw-bold mt-5 mt-md-0">Forgotten Your Password?</p>
                                        <div class="row justify-content-center">
                                            <div class="col-12">
                                                <label for="email" class="pb-1 fw-bold">Enter your registered email</label>
                                            </div>
                                            <div class="col-12">
                                                <input type="text" name="email" class="w-100" required>
                                            </div>
                        
                                        
                                            
                                            <button class="log fw-bold mt-4">Submit</button>

                                            
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>


                    </div>
    
                </div>
            </div>

        </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script>
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("modalBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal
        btn.onclick = function() {
        modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }

    </script>
</body>
</html>