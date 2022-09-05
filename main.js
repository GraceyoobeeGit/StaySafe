let accomodationArray;
let chosenNumberOfDays;
var modal = document.querySelector("#myModal");
var ChooseMeal = document.querySelector(".choose-meal");
var SelectedMeal = document.querySelector(".modal__meal--container");
var success = document.querySelector(".success");


async function fetchAccomodationJson() {
  const response = await fetch("/accomodation.json");
  const data = await response.json();

  accomodationArray = data.accomodation; 

  displayAccomodationSection(accomodationArray);
}




function displayAccomodationSection(array) {
  let accomodationHtml = "";
  for (let accomodationObject of array) {

    accomodationHtml +=
      `<div class= "accomodation-card">
      <img class="image" src="${accomodationObject.image}"/>
      <p class="card-title">${accomodationObject.title}</p>
      <br>${accomodationObject.description}<br>
      <p>${accomodationObject.location}</p>
      <button data-id="${accomodationObject.id}" class="book__btn">Book</button>
      <div class="dropdown">
      <button class="drop__btn" type="button">Details</button>
      <div class="dropdown-content hidden">
      <p>Facilities ${accomodationObject.facility}</p>
      <p>Checking Time ${accomodationObject.check}</p>
      </div>
      </div>
      </div>`;
  }
  document.querySelector(".accomodation-section").innerHTML = accomodationHtml; 

  

  var detailbtns = document.querySelectorAll(".drop__btn");

  for (let detailbtn of detailbtns) {
    detailbtn.onclick = function(b) {

      console.log(b.currentTarget.dataset.id);
        let chosenId = b.currentTarget.dataset.id;
        accomodationArray.find(function(that) {
          return that.id == chosenId;
          
        });
        document.querySelector(".dropdown-content").classList.toggle("show");
      };




  var btns = document.querySelectorAll(".book__btn");

    for (let btn of btns) {
      btn.onclick = function(e) {
    
        console.log(e.currentTarget.dataset.id);
          let selectedId = e.currentTarget.dataset.id;
          let found = accomodationArray.find(function(thing) {
            return thing.id == selectedId;
    
          });
          document.querySelectorAll("#myModal").innerHTML = found;


        modal.style.display = "block";
        document.querySelector(".modal-image").src= found.image;

        var date = document.querySelector("#start-date").value;
        var numb = document.querySelector("#number-input").value;
        var totalAmount = chosenNumberOfDays * found.value;
  
        document.querySelector("#chInDate").innerHTML = date;
        document.querySelector("#totalDays").innerHTML = chosenNumberOfDays;
        document.querySelector("#totalPerson").innerHTML = numb;
        document.querySelector("#accoType").innerHTML = found.type;
         document.querySelector("#totalAmount").innerHTML = "$" + totalAmount;
         document.querySelector("#option-a").innerHTML = found.meala;
         document.querySelector("#option-b").innerHTML = found.mealb;



         const confirmBtn = document.querySelector("#confirm-btn");

         confirmBtn.onclick = function () {
          var map = document.querySelector("#map");
          map.style.display = "none";
          ChooseMeal.style.display = "none";
          SelectedMeal.style.display = "flex";
          confirmBtn.style.display = "none";
          success.style.display = "flex";
        
          var optionA = document.querySelector("#mealone");
          var optionB = document.querySelector("#mealtwo");


          if (optionA.checked) {
            document.querySelector(".meal-selected").innerHTML = found.meala;
          }

          if (optionB.checked) {
            document.querySelector(".meal-selected").innerHTML = found.mealb;
          }
         }
        }
      }
    }
  }


    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    



document.querySelector("#search-button").addEventListener("click", searchFunc);
function searchFunc() {
  document.querySelector("#main__accomodationlist").classList.remove("hidden");
  let matches = [];

  var place = document.querySelector("#type-input").value;
  var people = document.querySelector("#number-input").value;
  var location = document.querySelector("#location-input").value;


  for (let accomodation of accomodationArray) {
    if (accomodation.type.includes(place) && accomodation.location.includes(location) && people >= accomodation.min && people <= accomodation.max && chosenNumberOfDays >= accomodation.staymin && chosenNumberOfDays <= accomodation.staymax) { 
      matches.push(accomodation);
    }
}
displayAccomodationSection(matches)
}


function formValidation() {
  var date = document.querySelector("#start-date").value;
  var people = document.querySelector("#number-input").value;
  const button = document.querySelector("#search-button");
  


  if (people == "") {
    alert("please enter number of guests");
    button.disabled = true;
  }
  if (date == "") {
    alert("please enter start date of stay");
    button.disabled = true;
  }  else {
    button.disabled = false;
  }
  }



  const datepickerInstance = flatpickr("#start-date", {
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    
    onChange: function (dates, string, pickr) {
      maxDays = 15;
      
      if (dates.length === 1) {
        pickr.set(
          "maxDate",
          dates[0].fp_incr(maxDays - 1 || 1)
        );
        
        pickr.set("minDate", dates[0]);
      } else {
        
        let timeDifference = dates[1].getTime() - dates[0].getTime();
        chosenNumberOfDays = 1 + Math.floor(timeDifference / (1000 * 3600 * 24));

        document.querySelector("#day-input").innerHTML = chosenNumberOfDays;

      }
    },
    onClose: function (dates, string, pickr) {
      pickr.set("maxDate", null);
      pickr.set("minDate", "today");
    },
  });


  function FeedbackForm() {
    document.querySelector("#review").classList.add("hidden");
    document.querySelector("#feedback__text").innerHTML = "Your feedback has been sent";
  }



fetchAccomodationJson();



let map = L.map('map');
map.setView([-45.0301511, 168.6615141], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);


let marker = [];

function addMarker(coordinateArray) {
  let marker = L.marker(coordinateArray);
  marker.push(marker);
  marker.addTo(map);
}

var circle = L.circle([-45.0301511, 168.6615141], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);

