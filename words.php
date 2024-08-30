<?php
header('Content-Type: application/json');

// Define the words and their difficulty levels
$easy = [
    "IEEE",   // 4 letters
    "ENSIT",  // 5 letters
    "Day",    // 3 letters
    "Xtreme", // 6 letters
    "TSYP",   // 4 letters
    "SIGHT",  // 5 letters
    "IAS",    // 3 letters
    "CS",     // 2 letters
    "SIGHT",       // 5 letters
    "AESS",        // 4 letters
    "WIE",         // 3 letters
    "PES",         // 3 letters
    "RAS",         // 3 letters
];

$medium = [
    "Engineers",   // 9 letters
    "Innovation",  // 11 letters
    "Research",    // 8 letters
    "Networking",  // 10 letters
    "Robotics",    // 8 letters
    "Education",   // 9 letters
    "Leadership",  // 10 letters
    "Chapters",    // 8 letters
    "Awards",      // 6 letters
    "Outreach",    // 8 letters
    "Ethics",      // 6 letters
    "Resources",   // 9 letters
    "Sponsorship", // 11 letters
    "Standards",   // 9 letters
    "Fellows",     // 7 letters
    "Sections",    // 8 letters
    "Committee",   // 10 letters
    "Spectrum",    // 9 letters
    "Societies",   // 9 letters
    "Initiatives", // 11 letters
    "Certification", // 14 letters
];

$hard = [
    "Electronics", // 12 letters
    "Microcontroller", // 16 letters
    "Programming", // 11 letters
    "Automation",  // 10 letters
    "Publication", // 11 letters
    "Development", // 11 letters
    "Conference",  // 11 letters
    "Symposium",   // 9 letters
    "Webinar",     // 8 letters
    "Professional",// 12 letters
    "Scholarships",// 12 letters
    "Partnerships",// 12 letters
    "Xplore",      // 6 letters
];

$words = [
    "easy" => $easy,
    "medium" => $medium,
    "hard" => $hard
];

echo json_encode($words);
?>


