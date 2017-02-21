var addRow = function (timeIn,name,email)
{
         if (!document.getElementsByTagName) return;
         var name = document.getElementById('name').value;
         var email = document.getElementById('email').value;
         var timeIn = getTime();

         tabBody=document.getElementsByTagName('tbody').item(0);
         var heading = document.getElementById('theading');
         row=document.createElement("tr");

         cell1 = document.createElement("td");
         cell2 = document.createElement("td");
         cell3 = document.createElement("td");

         textnode1=document.createTextNode(timeIn);
         textnode2=document.createTextNode(name);
         textnode3=document.createTextNode(email);

         cell1.appendChild(textnode1);
         cell2.appendChild(textnode2);
         cell3.appendChild(textnode3);

         row.appendChild(cell1);
         row.appendChild(cell2);
         row.appendChild(cell3);
         console.log("here");
         // Increment Attendees Counter
         countAttendees();
         heading.parentNode.insertBefore(row, heading.nextSibling);
         //tabBody.appendChild(row);
         
}

function AddAfter(rowId){
    var target = document.getElementById(rowId);
    var newElement = document.createElement('tr');

    target.parentNode.insertBefore(newElement, target.nextSibling );
    return newElement;
}

var countAttendees = function(){
    var oRows = document.getElementById('table').getElementsByTagName('tr');
    var iRowCount = oRows.length;
    document.getElementById('count').innerHTML = iRowCount;
}

var getTime = function(){
   var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    var time = hours + ":" + minutes +" ";
    if(hours > 11){
        time+="PM";
    } else {
        time+="AM"
    }
    return time;
}
