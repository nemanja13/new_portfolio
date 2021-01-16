<?php
    header("Content-type: application/json");
    $data=["error_message"=>"An error has occurred"];
    $code=500;

    if(isset($_POST["submit"])){

        $name=trim($_POST["name"]);
        $email=trim($_POST["email"]);
        $subject=trim($_POST["subject"]);
        $message=trim($_POST["message"]);
        
        $errors=[];

        if(strlen($name) == 0 || strlen($email) == 0 || strlen($subject) == 0 || strlen($message) == 0 ){
            $errors[]="Please fill in all required fields.";
        }else{
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $errors[]="The email is not in good format";
            }
        }

        if(count($errors)){
            $data=["errors"=>$errors];
            $code=422;
        }
        else{
            try{
                $data=["success"=>"You have successfully sent the mail"];
                $to="nemanjamaksimovic13081999@gmail.com";
                $text=$name.",\n".$message ;
                $header="From: " . $email;
                mail($to, $subject, $text, $header);
            }catch(PDOException $e){
                $code=500;
                $data=["error_message"=>"Failed to send your message. Please try later or contact me directly nemanjamaksimovic13081999@gmail.com"];
            }
        }
    }
    echo json_encode($data);
    http_response_code($code);
?>