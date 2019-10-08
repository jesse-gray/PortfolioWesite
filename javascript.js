//----------JavaScript Page----------
//Check if input contains all vowels
function vowelCheck() {
    var inputString = document.getElementById("vowelInput").value;
    var result = true;

    for (var i = 0; i < inputString.length; i++) {
        if (!(inputString.charAt(i) == "a" || inputString.charAt(i) == "e" || inputString.charAt(i) == "i" || inputString.charAt(i) == "o" || inputString.charAt(i) == "u")) {
            result = false;
        }
    }

    if (result && inputString != "") {
        document.getElementById("vowelOutput").innerHTML = "True: " + inputString + " is only vowels";
    } else {
        document.getElementById("vowelOutput").innerHTML = "False: " + inputString + " is NOT only vowels";
    }
}

//Changes image to display or not if checkbox is selected
function showHideImage(image) {
    var image = document.getElementById(image);

    if (image.style.visibility == "visible") {
        image.style.visibility = "hidden";
    } else {
        image.style.visibility = "visible";
    }

}

//Calculates GST of a given number
function calculateGST() {
    var userInput = document.getElementById("gstInput").value;

    if (isNaN(userInput) || userInput == "") {
        document.getElementById("gstOutput").innerHTML = "Please enter a valid number";
    } else {
        document.getElementById("gstOutput").innerHTML = "GST is $" + (userInput * 0.15);
    }
}

//Formats a given date to a sentence structure
function formatDate() {
    //Get entered date from user
    const enteredDate = document.getElementById("dateInput").value;

    //Convert to a date object
    const convertDate = new Date(enteredDate);

    //Find the output
    let output = document.getElementById("dateOutput");

    //Months array
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //Get the day and display on count
    if (convertDate != "Invalid Date") {
        output.innerHTML = convertDate.getDate() + " " + months[(convertDate.getMonth())] + " " + convertDate.getFullYear();
    } else {
        output.innerHTML = "Please enter a valid date"
    }

}

//----------RSS Page----------
//Loads RSS document
function loadRSS() {
    //Use CORS API website as proxy to retrieve XML file
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var url = "https://www.smashingmagazine.com/feed/";

    //Declare XMLHttpRequest Object
    var xmlhttp = new XMLHttpRequest();
    //Send a request from Client side to Server to retrieve the contact.xml document
    xmlhttp.open("GET", proxy + url, true);
    xmlhttp.send();
    //Check if the entire xml document has been received? If so, process it.
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Load XML document as XML format and process
            processRSS(this);
        }
    };
}

//Finds relevant data in document and displays it on the webpage
function processRSS(rss) {
    //Load RSS document and then load all "items" in this RSS document
    const items = rss.responseXML.getElementsByTagName("item");

    //Loop through all items 6 times (only need 6)
    var itemInfo;
    for (var i = 0; i < 6; i++) {
        //Extract data from each article (item)
        itemInfo = items[i].children;
        let title, description, link;

        //Loop through all child elements in "itemInfo"
        for (var j = 0; j < itemInfo.length; j++) {
            //Check if the tagName is title/description/link?
            if (itemInfo[j].tagName == "title") {
                title = itemInfo[j].innerHTML;
            } else if (itemInfo[j].tagName == "link") {
                link = itemInfo[j].innerHTML;
            } else if (itemInfo[j].tagName == "description") {
                description = itemInfo[j].innerHTML;
            }
        }

        //Display extracted article (item) into the divs
        document.getElementsByClassName("rssTitle")[i].innerHTML = title;
        document.getElementsByClassName("rssDescription")[i].innerHTML = description;
        document.getElementsByClassName("rssLink")[i].innerHTML = link;
        document.getElementsByClassName("rssLink")[i].href = link;
    }
}