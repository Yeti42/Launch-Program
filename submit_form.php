<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $availability = htmlspecialchars($_POST['availability']);
    $interests = htmlspecialchars($_POST['interests']);
    $experience = htmlspecialchars($_POST['experience']);

    // Email details
    $to = "dave@stevens-home.com";
    $subject = "New Volunteer Application from $name";
    $message = "
    Name: $name\n
    Email: $email\n
    Phone: $phone\n
    Availability: $availability\n
    Areas of Interest: $interests\n
    Previous Volunteer Experience: $experience
    ";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you for your application, $name. We will get back to you soon.";
    } else {
        echo "Sorry, there was an error sending your application. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>