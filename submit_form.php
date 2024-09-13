<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // Email details
    $to = "waterfallsue1@gmail.com";
    $subject = "New Volunteer Application from $name";
    $message = "
    Name: $name\n
    Email: $email\n
    Phone: $phone\n
    Message: $message\n
    ";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you, $name. We will get back to you soon.";
    } else {
        echo "Sorry, there was an error sending your application. Please try again later.";
    }
    echo ("\n<a href='contact.html'>Return</a>");
} else {
    echo "Invalid request method.";
}
?>
