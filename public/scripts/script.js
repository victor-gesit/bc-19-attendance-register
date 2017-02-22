//const controller = require('./indexController');

function addRow(timeIn,name,email)
{
         if (!document.getElementsByTagName) return;
         let name = document.getElementById('name').value;
         const email = document.getElementById('email').value;
         const timeIn = getTime();

         tabBody=document.getElementsByTagName('tbody').item(0);
         const heading = document.getElementById('theading');
         row=document.createElement('tr');

         cell1 = document.createElement('td');
         cell2 = document.createElement('td');
         cell3 = document.createElement('td');

         textnode1=document.createTextNode(timeIn);
         textnode2=document.createTextNode(name);
         textnode3=document.createTextNode(email);

         cell1.appendChild(textnode1);
         cell2.appendChild(textnode2);
         cell3.appendChild(textnode3);

         row.appendChild(cell1);
         row.appendChild(cell2);
         row.appendChild(cell3);

         // Increment Attendees Counter
         countAttendees();
         // Insert new row
         heading.parentNode.insertBefore(row, heading.nextSibling);
         //tabBody.appendChild(row);
         
}

function AddAfter(rowId){
    const target = document.getElementById(rowId);
    const newElement = document.createElement('tr');

    target.parentNode.insertBefore(newElement, target.nextSibling );
    return newElement;
}

function countAttendees(){
    const oRows = document.getElementById('table').getElementsByTagName('tr');
    const iRowCount = oRows.length;
    document.getElementById('count').innerHTML = iRowCount;
}

function getTime(){
   const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    if (minutes < 10){
        minutes = '0' + minutes;
    }
    if (seconds < 10){
        seconds = '0' + seconds;
    }
    let time = hours + ':' + minutes +' ';
    if(hours > 11){
        time+='PM';
    } else {
        time+='AM'
    }
    return time;
}
