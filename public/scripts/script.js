var addRow = function ()
{
         var name = document.getElementById('name').innerHTML;
         var email = document.getElementById('email').innerHTML;
         var timeIn = getTime();
         if (!document.getElementsByTagName) return;
         tabBody=document.getElementsByTagName("tbody").item(0);
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
         tabBody.appendChild(row);
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
