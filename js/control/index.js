/*
@name= window.onload = function()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function runs when the page is loaded.
  @date = 16-11-2018
  @params= none
  @return = none
*/
window.onload = function(){
  showIntro();
}

/*
@name= introduce()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function takes the values from the form located in index HTML and generates a dinamic HTML table according to the introduced Data
  @date = 16-11-2018
  @params= none
  @return = none
*/
function introduce(){

  var numberPatients = window.parent.document.getElementById("numberClients").value;  //pick the value from the index.html

  if(isBlank(numberPatients)){ //validating introduced data
    document.getElementById("pErrors").innerHTML = "Input data must not be empty";
  }else if (isNaN(numberPatients)) {
    document.getElementById("pErrors").innerHTML = "Input data must be a number";
  }else if(isNegative(numberPatients)){
    document.getElementById("pErrors").innerHTML = "Input data must be greater than zero";
  }else{
  var strClient = "";
  for(var i=0; i<numberPatients; i++){  //generates dinamicly a number of rows according to the number previously introduced
          strClient += "<tr>";
          strClient += "<td><input type='text' class= 'clname' placeholder='Name'></td>";
          strClient += "<td><input type='text' class='clsurname' placeholder='Surname'></td>";
          strClient += "<td><select class='clgender'  id='testType'>";
					strClient +="<option value='Male'>Male</option>";
          strClient +="<option value='Female'>Female</option>";
					strClient +="	</select></td>";
          strClient += "<td><input type='text' class='clage' placeholder='Age>=18'></td>";
          strClient += "</tr>";
      }
      window.frames[0].document.getElementById("tableClients").innerHTML += strClient;
      window.parent.document.getElementById('menu').style.display="none"; //hide
      window.parent.document.getElementById('principal').style.display="block"; //show
    }
}

/*
@name= introduceinDB()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if values of name and surname are empty or a number, and if the age is lower than 18, and if not, throws an alert asking if you want to continue
  If you answer OK, a pop-up window will be open
  @date = 16-11-2018
  @params= none
  @return = none
*/
function introduceinDB(){

  var name = document.getElementsByClassName("clname");  //picks the values into arrays from the iframe
  var surname = document.getElementsByClassName("clsurname");
  var age = document.getElementsByClassName("clage");
  var flag = false;

  for(var i=0; i<name.length; i++){   //validating the introduced data
    if(isBlank(name[i].value)){
      document.getElementById("fErrors").innerHTML="Name must not be empty";
      flag=true;
    }else if (!isNaN(name[i].value)) {
      document.getElementById("fErrors").innerHTML="Name must not be a number";
      flag=true;
    }else if(isBlank(surname[i].value)){
      document.getElementById("fErrors").innerHTML="Surname must not be empty";
      flag=true;
    }else if (!isNaN(surname[i].value)) {
      document.getElementById("fErrors").innerHTML="Surname must not be a number";
      flag=true;
    }
    if(age[i].value<18){
      document.getElementById("fErrors").innerHTML="Age must be greater than 18";
      flag=true;
    }
  }

  if(!flag){ //if all values are valid, it opens a pop-up window
  var decision = confirm("Do you really want to introduce these products?");
    if (decision){
        popupwind = window.open("../popUpWindows/popUpWindow.html", "_blank", "width=800px,height=800px");
    }
  }
}

/*
@name= loadData()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function takes the values from the iframe and generates another dinamic html table
  with the name, surname, gender and age of all introduced people.
  @date = 16-11-2018
  @params= none
  @return = none
*/
function loadData(){

  var sel = window.opener.parent.document.getElementById("testType").value; //picks the selected value from index.html

  if(sel=="Spinal muscular atrophy"){
    document.getElementById("title").innerHTML+="Spinal muscular atrophy"; //writes in the pop-up window
  }else if (sel=="Non-polypestic colorectal cancer") {
    document.getElementById("title").innerHTML+="Non-polypestic colorectal cancer";
  }else if (sel=="Autism spectrum disorders") {
    document.getElementById("title").innerHTML+="Autism spectrum disorders";
  }

  currentDate(); //calls a function to calculate the date

  var name = window.opener.document.getElementsByClassName("clname");  //picks the introduced data from the frame
  var surname = window.opener.document.getElementsByClassName("clsurname");
  var gender = window.opener.document.getElementsByClassName("clgender");
  var age = window.opener.document.getElementsByClassName("clage");

  var result="";
  for(var i=0;i<name.length;i++){  //generates another dinamic html table, and it will be printed in the pop-up window
    result +="<tr>";
    result += "<td>" + name[i].value + "</td>";
    result += "<td>" + surname[i].value + "</td>";
    var is_selected="";
    if (gender[i].value=="Male") {
      is_selected="Male";
    }else if(gender[i].value=="Female"){
      is_selected="Female";
    }
    result += "<td>" + is_selected + "</td>";
    result += "<td>" + age[i].value + "</td>";
    }
document.getElementById("finalTable").innerHTML += result;

}

/*
@name= currentDate()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function calculates the current date
  @date = 16-11-2018
  @params= none
  @return = none
*/
function currentDate(){

  var months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
  var daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var today = new Date();

  var date = daysWeek[today.getDay()] + ", " + today.getDate() + " of " + months[today.getMonth()] + " of " + today.getFullYear();

  document.getElementById("tdate").innerHTML += date;

}

/*
@name= isBlank(param)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if an input is empty or not
  @date = 16-11-2018
  @params= param
  @return = boolean
*/
function isBlank(param){
  return (param =="");
}

/*
@name= isNegative(param)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if a number is negative or not
  @date = 16-11-2018
  @params= param
  @return = boolean
*/
function isNegative(param){
  return (param<=0);
}

/*
    @name= showIntro()
      @author= Elisabet M. Aguayo Sedano
      @version= 1.0
      @description= This function selects what divs must be shown
      @date = 16-11-2018
      @params= none
      @return = none
    */
function showIntro (){
window.parent.document.getElementById('menu').style.display="block";
window.parent.document.getElementById('principal').style.display="none";
}

/*
@name= cancelButton()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function goes back to the first page
  @date = 16-11-2018
  @params= none
  @return = none
*/
function cancelButton(){
  showIntro();
  window.parent.document.getElementById('numberClients').value="";
}
