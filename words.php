<?php
header('Content-Type: application/json');

$easy = [
    "IEEE",   
    "ENSIT",  
    "Day",  
    "Xtreme",
    "TSYP",   
    "SIGHT",  
    "IAS",  
    "CS",     
    "SIGHT",       
    "AESS",        
    "WIE",       
    "PES",       
    "RAS",  
    "RTC",
    "CSTAM",
    "Computer",
    "Papers",
    "Bootcamp",
    "workshop",
    "Xplore",     
];

$medium = [
    "Engineers",  
    "Creativity",
    "Innovation", 
    "Research",   
    "Networking", 
    "Robotics",   
    "Education",  
    "Leadership", 
    "Chapters",   
    "Awards",     
    "Outreach",   
    "Ethics",     
    "Resources",  
    "Sponsorship",
    "Standards",  
    "Fellows",    
    "Sections",   
    "Committee",  
    "Spectrum",   
    "Societies",  
    "Initiatives",
    "Certification", 
];

$hard = [
    "Electronics", 
    "Microcontroller", 
    "Programming",
    "Automation", 
    "Publication",
    "Development",
    "Conference", 
    "Symposium",  
    "Webinar",    
    "Professional",
    "Scholarships",
    "Partnerships",
    "Collabratec",
];

$words = [
    "easy" => $easy,
    "medium" => $medium,
    "hard" => $hard
];

echo json_encode($words);
?>


