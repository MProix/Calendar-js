var body = document.getElementById("body");

var mainCalendar = document.createElement("div");
mainCalendar.id = "mainCalendar";
mainCalendar.style.height = toVh(userHeight)+"vh";
mainCalendar.style.width = "80%";
mainCalendar.style.backgroundColor = "white";
body.appendChild(mainCalendar);

var calendarUtils = document.createElement("div");
calendarUtils.id = "calendarUtils";
calendarUtils.style.height = toVh(userHeight)+"vh";
calendarUtils.style.width = "20%";
calendarUtils.style.backgroundColor = "rgba(152,255,150,0.5)";
body.appendChild(calendarUtils);

var miniCal = document.createElement("div");
miniCal.id = "miniCal";
miniCal.style.height = toVh(userHeight/2)+"vh";
miniCal.style.width = "100%";
miniCal.style.backgroundColor = "rgba(0,0,0,0.2)";
calendarUtils.appendChild(miniCal);

var listCals = document.createElement("div");
listCals.id = "listCals";
listCals.style.height = toVh(userHeight/2)+"vh";
listCals.style.width = "100%";
calendarUtils.appendChild(listCals);

var mainCalHeader = document.createElement("div");
mainCalHeader.id = "mainCalHeader";
mainCalHeader.style.height = "10vh";
mainCalHeader.style.width = "100%";
mainCalHeader.style.backgroundColor = "white";
mainCalHeader.style.display = "flex";
mainCalHeader.style.flexWrap = "nowrap";
mainCalHeader.style.lineHeight = "10vh";
mainCalendar.appendChild(mainCalHeader);

var mainCalContent = document.createElement("div");
mainCalContent.id = "mainCalContent";
mainCalContent.style.width = "95%";
mainCalContent.style.height = toVh(userHeight)-10+"vh";
mainCalContent.style.overflow = "scroll";
mainCalendar.appendChild(mainCalContent);

var btnPrev = document.createElement("input");
btnPrev.id = "btnPrev";
btnPrev.style.marginTop = "2vh";
btnPrev.style.marginLeft = "1vw";
btnPrev.style.marginBottom = "2vh";
btnPrev.type = "button";
btnPrev.value = "<";
mainCalHeader.appendChild(btnPrev);
btnPrev.onclick=function(){
	
	if (mainCalContent.childNodes[0].id === "tableDay"){
		selectedDate = getPreviousDay(selectedDate);
		mainCalContent.replaceChild(doTableDay(selectedDate),mainCalContent.childNodes[0]);
	}
	else if (mainCalContent.childNodes[0].id === "tableWeek"){
		selectedDate = getPreviousWeek(selectedDate);
		mainCalContent.replaceChild(doTableWeek(selectedDate),mainCalContent.childNodes[0]);
	}
	else if (mainCalContent.childNodes[0].id === "tableMonth"){
		selectedDate = getPreviousMonth(selectedDate);
		mainCalContent.replaceChild(doTableMonth(selectedDate),mainCalContent.childNodes[0]);
	};
	makeEditable();
	$(".fullDayEventCell").click(function(e){
		openForm(this);
	});
	$(".eventCell").click(function(){
		openForm(this);
	});
};

var btnNext = document.createElement("input");
btnNext.id = "btnNext";
btnNext.style.marginTop = "2vh";
btnNext.style.marginBottom = "2vh";
btnNext.type = "button";
btnNext.value = ">";
mainCalHeader.appendChild(btnNext);
btnNext.onclick=function(){
	
	if (mainCalContent.childNodes[0].id === "tableDay"){
		selectedDate = getNextDay(selectedDate);
		mainCalContent.replaceChild(doTableDay(selectedDate),mainCalContent.childNodes[0]);
	}
	else if (mainCalContent.childNodes[0].id === "tableWeek"){
		selectedDate = getNextWeek(selectedDate);
		mainCalContent.replaceChild(doTableWeek(selectedDate),mainCalContent.childNodes[0]);
	}
	else if (mainCalContent.childNodes[0].id === "tableMonth"){
		selectedDate = getNextMonth(selectedDate);
		mainCalContent.replaceChild(doTableMonth(selectedDate),mainCalContent.childNodes[0]);
	};
	makeEditable();
	$(".fullDayEventCell").click(function(e){
		openForm(this);
	});
	$(".eventCell").click(function(){
		openForm(this);
	});
};

var btnToday = document.createElement("input");
btnToday.id = "btnToday";
btnToday.style.marginTop = "2vh";
btnToday.style.marginBottom = "2vh";
btnToday.style.marginLeft = "2vw";
btnToday.type = "button";
btnToday.value = "Aujourd'hui";
mainCalHeader.appendChild(btnToday);
btnToday.onclick=function(){
	selectedDate = nowDate;
	if (mainCalContent.childNodes[0].id === "tableDay"){
		mainCalContent.replaceChild(doTableDay(selectedDate),mainCalContent.childNodes[0]);
	}
	else if (mainCalContent.childNodes[0].id === "tableWeek"){
		mainCalContent.replaceChild(doTableWeek(selectedDate),mainCalContent.childNodes[0]);
	}
	else if (mainCalContent.childNodes[0].id === "tableMonth"){
		mainCalContent.replaceChild(doTableMonth(selectedDate),mainCalContent.childNodes[0]);
	};
	makeEditable();
	$(".fullDayEventCell").click(function(e){
		openForm(this);
	});
	$(".eventCell").click(function(){
		openForm(this);
	});
};


var monthYearAffich = document.createElement("p");
monthYearAffich.id = "monthYearAffich";
monthYearAffich.textContent = months[selectedDate.getMonth()]+" "+selectedDate.getFullYear();
monthYearAffich.style.fontSize = "2vw";
monthYearAffich.style.margin = "0px";
monthYearAffich.style.flex = "1";
monthYearAffich.style.textAlign = "center";
mainCalHeader.appendChild(monthYearAffich);

var affichDay = document.createElement("input");
affichDay.id = "affichDay";
affichDay.type = "button";
affichDay.value = "Jour";
affichDay.style.marginBottom = "2vh";
affichDay.style.marginTop = "2vh";
mainCalHeader.appendChild(affichDay);
affichDay.onclick=function(){
	mainCalContent.replaceChild(doTableDay(selectedDate),mainCalContent.childNodes[0]);
	makeEditable();
	$(".fullDayEventCell").click(function(e){
		openForm(this);
	});
	$(".eventCell").click(function(){
		openForm(this);
	});
};

var affichWeek = document.createElement("input");
affichWeek.id = "affichWeek";
affichWeek.type = "button";
affichWeek.value = "Semaine";
affichWeek.style.marginTop = "2vh";
affichWeek.style.marginBottom = "2vh";
mainCalHeader.appendChild(affichWeek);
affichWeek.onclick=function(){
	mainCalContent.replaceChild(doTableWeek(selectedDate),mainCalContent.childNodes[0]);
	makeEditable();
	$(".fullDayEventCell").click(function(e){
		openForm(this);
	});
	$(".eventCell").click(function(){
		openForm(this);
	});
};
mainCalContent.appendChild(doTableWeek(selectedDate));

var affichMonth = document.createElement("input");
affichMonth.id = "affichMonth";
affichMonth.type = "button";
affichMonth.value = "Mois";
affichMonth.style.marginTop = "2vh";
affichMonth.style.marginBottom = "2vh";
affichMonth.style.marginRight = "1vw";
mainCalHeader.appendChild(affichMonth);
affichMonth.onclick=function(){
	mainCalContent.replaceChild(doTableMonth(selectedDate),mainCalContent.childNodes[0]);
	makeEditable();
	$(".fullDayEventCell").click(function(e){
		openForm(this);
	});
	$(".eventCell").click(function(){
		openForm(this);
	});
};

var formEvent = document.createElement("form");
formEvent.id = "formEvent";
formEvent.className = "formEvent";
mainCalContent.appendChild(formEvent);
var titleEvent = document.createElement("input");
titleEvent.id = "titleEvent";
titleEvent.type = "text";
titleEvent.name = "title";
titleEvent.placeholder = "Ajouter un titre";
formEvent.appendChild(titleEvent);
formEvent.appendChild(document.createElement("br"));
var beginHour = document.createElement("input");
beginHour.id = "beginHour";
beginHour.type = "time";
beginHour.name = "eventHour";
var beginDay = document.createElement("input");
beginDay.id = "beginDay";
beginDay.type = "date";
beginDay.name = "eventHour";
var labelBeginHour = document.createElement("Label");
labelBeginHour.setAttribute("for","eventHour");
labelBeginHour.innerHTML = "Début : ";
formEvent.appendChild(labelBeginHour);
formEvent.appendChild(beginDay);
formEvent.appendChild(beginHour);
$('#beginHour').timepicker({
    hourText: 'Heures',
    minuteText: 'Minutes',
    amPmText: ['AM', 'PM'],
    timeSeparator: ':',
    nowButtonText: 'Maintenant',
    showNowButton: true,
    closeButtonText: 'Fermer',
    showCloseButton: true,
    deselectButtonText: 'Désélectionner',
    showDeselectButton: true
});

var endHour = document.createElement("input");
endHour.id = "endHour";
endHour.type = "time";
endHour.name = "eventHourEnd";
var endDay = document.createElement("input");
endDay.id = "endDay";
endDay.type = "date";
endDay.name = "eventHour";
var labelEndHour = document.createElement("Label");
labelEndHour.setAttribute("for","eventHour");
labelEndHour.innerHTML = "Fin : ";
formEvent.appendChild(document.createElement("br"));
formEvent.appendChild(labelEndHour);
formEvent.appendChild(endDay);
formEvent.appendChild(endHour);
$('#endHour').timepicker({
    hourText: 'Heures',
    minuteText: 'Minutes',
    amPmText: ['AM', 'PM'],
    timeSeparator: ':',
    nowButtonText: 'Maintenant',
    showNowButton: true,
    closeButtonText: 'Fermer',
    showCloseButton: true,
    deselectButtonText: 'Désélectionner',
    showDeselectButton: true
});
var fullDay = document.createElement("input");
fullDay.name = "fullDay";
fullDay.value = "fullDay";
fullDay.class = "fullDay";
fullDay.type = "checkbox";
var labelFullDay = document.createElement("Label");
labelFullDay.setAttribute("for","fullDay");
labelFullDay.innerHTML = "Journée entière ";
formEvent.appendChild(document.createElement("br"));
formEvent.appendChild(fullDay);
formEvent.appendChild(labelFullDay);

var repeatEvent = document.createElement("input");
repeatEvent.name = "repeatEvent";
repeatEvent.value = "repeatEvent";
repeatEvent.class = "repeatEvent";
repeatEvent.type = "checkbox";
var labelRepeatEvent = document.createElement("Label");
labelRepeatEvent.setAttribute("for","repeatEvent");
labelRepeatEvent.innerHTML = "Répéter l'événement ";
formEvent.appendChild(document.createElement("br"));
formEvent.appendChild(repeatEvent);
formEvent.appendChild(labelRepeatEvent);
formEvent.appendChild(document.createElement("br"));
var description = document.createElement("textarea");
description.id = "description";
description.name = "description";
description.rows = "4";
description.cols = "40";
description.placeholder = "Description de l'événement...";
formEvent.appendChild(description);
var eventID = document.createElement("input");
eventID.id = "eventID";
eventID.value = "";
eventID.style.visibility = "hidden";
formEvent.appendChild(eventID)

var submit = document.createElement("input");
submit.id = "submit";
submit.name = "submit";
submit.type = "button";
submit.value = "Enregistrer";
formEvent.appendChild(document.createElement("br"));
formEvent.appendChild(submit);
submit.onclick=function(){
	createNewEvent(formEvent);
	$("#formEvent").removeClass("show");
};
	
var reset = document.createElement("input");
reset.id = "reset";
reset.name = "reset";
reset.type = "reset";
reset.value = "Réinitialiser";
formEvent.appendChild(reset);
var quit = document.createElement("input");
quit.id = "quit";
quit.name = "quit";
quit.type = "button";
quit.value = "Annuler";
formEvent.appendChild(quit);




//-----------------------------------

makeEditable();

$(".fullDayEventCell").click(function(e){
	$("#formEvent").addClass("show");
	// var xPos = e.clientX;
	// var yPos = e.clientY;
	// console.log(xPos+" , "+yPos);
	openForm(this);
});
$(".eventCell").click(function(){
	$("#formEvent").addClass("show");
	var listValues = document.getElementById("formEvent").childNodes;
		for (val of listValues){
			if (val.tagName === "INPUT"){
				val.disabled = false;
			}
		};
	openForm(this);
});

