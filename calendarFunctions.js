nowDate = new Date();
selectedDate = nowDate;
var months=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
var days=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
class CalEvent {
	constructor(identifier,title,dateBeg,hourBeg,dateEnd,hourEnd,fullDay,repeat,description){
		this.identifier=identifier;
		this.title=title;
		this.dateBeg=dateBeg;
		this.hourBeg=hourBeg;
		this.dateEnd=dateEnd;
		this.hourEnd=hourEnd;
		this.fullDay=fullDay;
		this.repeat=repeat;
		this.description=description;		
	}
};
var CalEventsList = [];

//------------------Units convert functions-------------------------------
function toVh(value){
	return (100*value)/userHeight;
};
function toVw(value){
	return (100*value)/userWidth;
};
function vwToPx(value){
	return (userWidth*value)/100;
};
function vhToPx(value){
	return (userHeight*value)/100;
};
//-------------------------standard view-----------------------------------
var userWidth = window.innerWidth;
var userHeight = window.innerHeight;
//console.log(userWidth+"  :  "+userHeight);
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
function doTableDay(someDay){
	monthYearAffich.textContent = months[selectedDate.getMonth()]+" "+selectedDate.getFullYear();
	var tableDay = document.createElement("table");
	tableDay.id = "tableDay";
	var titleTableDayLine = document.createElement("tr");
	titleTableDayLine.id = "titleTableDayLine";
	tableDay.appendChild(titleTableDayLine);
	var titleTableDayCell = document.createElement("th");
	titleTableDayCell.id = "titleTableDayCell";
	titleTableDayCell.colSpan = "2";
	titleTableDayCell.textContent = days[someDay.getDay()]+" "+someDay.getDate()+" "+months[someDay.getMonth()];
	titleTableDayLine.appendChild(titleTableDayCell);
	var fullDayEventLine = document.createElement("tr");
	fullDayEventLine.className = "fullDayEventLine";
	tableDay.appendChild(fullDayEventLine);
	var fullDayEventCell = document.createElement("td");
	fullDayEventCell.className = "fullDayEventCell";
	fullDayEventCell.id = someDay.getFullYear()+"/"+Number(someDay.getMonth()+1)+"/"+someDay.getDate();
	fullDayEventLine.appendChild(document.createElement("td"));
	fullDayEventLine.appendChild(fullDayEventCell);
	for(let cpt=0;cpt<24;cpt++){
		var tableDayLine = document.createElement("tr");
		tableDayLine.className = "tableDayLine";
		tableDayLine.id = "tableDayLine"+cpt;
		tableDay.appendChild(tableDayLine);
		var hourCell = document.createElement("td");
		hourCell.className = "hourCell TableDay";
		hourCell.id = "hourCell"+cpt;
		if (cpt<10){
			hourCell.textContent = "0"+cpt+":00";
		}
		else{
			hourCell.textContent = cpt+":00";
		};
		var eventCell = document.createElement("td");
		eventCell.className = "eventCell TableDay";
		eventCell.id = someDay.getFullYear()+"/"+Number(someDay.getMonth()+1)+"/"+someDay.getDate()+"/"+cpt;
		if(someDay.getDate() === nowDate.getDate() 
			&& someDay.getFullYear() === nowDate.getFullYear() 
			&& someDay.getMonth() === nowDate.getMonth()){
			eventCell.style.backgroundColor = "rgba(127,143,240,0.2)";
			fullDayEventCell.style.backgroundColor = "rgba(127,143,240,0.4)";
		};
		tableDayLine.appendChild(hourCell);
		tableDayLine.appendChild(eventCell);
	};

	return tableDay;
};

function doTableWeek(someDay){
	nextDay = copyDate(someDay);
	monthYearAffich.textContent = months[selectedDate.getMonth()]+" "+selectedDate.getFullYear();
	var tableWeek = document.createElement("table");
	tableWeek.id = "tableWeek";
	var titleTableWeekLine = document.createElement("tr");
	titleTableWeekLine.id = "titleTableWeekLine";
	tableWeek.appendChild(titleTableWeekLine);
	titleTableWeekLine.appendChild(document.createElement("td"));
	for(let cpt=0;cpt<7;cpt++){
		var titleTableWeekCell = document.createElement("th");
		titleTableWeekCell.className = "titleTableWeekCell";
		titleTableWeekCell.id = "titleTableWeekCell"+cpt;
		nextDay.setTime(getFirstDayWeek(someDay).getTime()+cpt*1000*3600*24);
		titleTableWeekCell.textContent = (days[getFirstDayWeek(someDay).getDay()+cpt]).slice(0,3)+" "+nextDay.getDate()+"/"+Number(nextDay.getMonth()+1);
		//background today in blue
		if (nextDay.getFullYear()===nowDate.getFullYear()
			&& nextDay.getMonth()===nowDate.getMonth()
			&& nextDay.getDate()===nowDate.getDate()) {
			var blueCol = cpt;
		};
		titleTableWeekLine.appendChild(titleTableWeekCell);
	};
	var fullDayEventLine = document.createElement("tr");
	fullDayEventLine.className = "fullDayEventLine";
	tableWeek.appendChild(fullDayEventLine);
	fullDayEventLine.appendChild(document.createElement("td"));
	nextDay = copyDate(someDay);
	for(let cpt=0;cpt<7;cpt++){
		nextDay.setTime(getFirstDayWeek(someDay).getTime()+cpt*1000*3600*24);
		nextDay.setHours(0);
		nextDay.setMinutes(0);
		nextDay.setSeconds(0);
		var fullDayEventCell = document.createElement("td");
		fullDayEventCell.className = "fullDayEventCell";
		fullDayEventCell.id = nextDay.getTime();
		if(blueCol===cpt){
			fullDayEventCell.style.backgroundColor = "rgba(127,143,240,0.4)";
		};
		fullDayEventLine.appendChild(fullDayEventCell);
	};
	for(let cpt=0;cpt<24;cpt++){
		var tableWeekLine = document.createElement("tr");
		tableWeekLine.className = "tableWeekLine";
		tableWeekLine.id = "tableWeekLine"+cpt;
		tableWeek.appendChild(tableWeekLine);
		var hourCell = document.createElement("td");
		hourCell.className = "hourCell tableWeek";
		hourCell.id = "hourCell"+cpt;
		if (cpt<10){
			hourCell.textContent = "0"+cpt+":00";
		}
		else{
			hourCell.textContent = cpt+":00";
		};		
		tableWeekLine.appendChild(hourCell);
		nextDay = copyDate(someDay);
		for(let i=0;i<7;i++){	
			var eventCell = document.createElement("td");
			eventCell.className = "eventCell";
			nextDay.setTime(getFirstDayWeek(someDay).getTime()+i*1000*3600*24);
			nextDay.setHours(0);
			nextDay.setMinutes(0);
			nextDay.setSeconds(0);
			eventCell.id = nextDay.getTime()+cpt*3600*1000;
			if(blueCol===i){
			eventCell.style.backgroundColor = "rgba(127,143,240,0.2)";
		};
			tableWeekLine.appendChild(eventCell);
		};

	};
	return tableWeek;
};

function doTableMonth(someDay){
	monthYearAffich.textContent = months[selectedDate.getMonth()]+" "+selectedDate.getFullYear();
	var dayInit = (getFirstDayMonth(someDay).getTime())-(getFirstDayMonth(someDay).getDay())*1000*3600*24;
	var changingDay = new Date();
	var tableMonth = document.createElement("table");
	tableMonth.id = "tableMonth";
	var titleTableMonthLine = document.createElement("tr");
	titleTableMonthLine.id = "titleTableMonthLine";
	tableMonth.appendChild(titleTableMonthLine);
	for(let cpt=0;cpt<7;cpt++){
		var titleTableMonthCell = document.createElement("th");
		titleTableMonthCell.className = "titleTableMonthCell";
		titleTableMonthCell.id = "titleTableMonthCell"+cpt;
		titleTableMonthCell.textContent = days[cpt].slice(0,3);
		titleTableMonthLine.appendChild(titleTableMonthCell);
	};
	for(let cpt=0;cpt<getWeeksNumber(someDay);cpt++){
		var tableMonthLine = document.createElement("tr");
		tableMonthLine.className = "tableMonthLine";
		tableMonthLine.id = "titleTableMonthLine"+cpt;
		tableMonth.appendChild(tableMonthLine);
		for(let i=0;i<7;i++){
			var eventCell = document.createElement("td");
			eventCell.className = "eventCell";
			tableMonthLine.appendChild(eventCell);
			var dateOfMonth = document.createElement("div");
			dateOfMonth.className = "dateOfMonth";
			changingDay.setTime(dayInit);
			dateOfMonth.textContent = changingDay.getDate()+"/"+Number(changingDay.getMonth()+1);
			eventCell.id = changingDay.getFullYear()+"/"+Number(changingDay.getMonth()+1)+"/"+changingDay.getDate();
			if (changingDay.getMonth()!==someDay.getMonth()){
				eventCell.style.color = "rgba(0,0,0,0.3)";
			};
			if (changingDay.getFullYear()===nowDate.getFullYear()
				&& changingDay.getMonth()===nowDate.getMonth()
				&& changingDay.getDate()===nowDate.getDate()){
				dateOfMonth.style.backgroundColor = "rgba(127,143,240,0.4)";
				eventCell.style.backgroundColor = "rgba(127,143,240,0.2)";
			}
			eventCell.appendChild(dateOfMonth);
			dayInit = (changingDay.getTime())+1000*3600*24;
		};
		if(getWeeksNumber(someDay)===6){
			tableMonthLine.style.height = "14vh";
		}
	};
	return tableMonth;
};

function copyDate(someDay){
	var newD = new Date();
	newD.setTime(someDay.getTime());
	return newD;
};
function getPreviousDay(someDay){
	var start = copyDate(someDay);
	start.setTime(start.getTime() - 1000*3600*24);
	// console.log(someDay+"--->"+start);
	return start;
};
function getNextDay(someDay){
	var start = copyDate(someDay);
	start.setTime(start.getTime() + 1000*3600*24);
	// console.log(someDay+"--->"+start);
	return start;	
};
function getFirstDayWeek(someDay){
	var firstDayWeek = copyDate(someDay);
	firstDayWeek.setTime(firstDayWeek.getTime() - someDay.getDay()*1000*3600*24);
	// console.log(someDay+"-->"+firstDayWeek);
	return firstDayWeek;
};
function getPreviousWeek(someDay){
	var newWeek = copyDate(someDay);
	newFirstDayWeek = getFirstDayWeek(newWeek);
	newFirstDayWeek.setTime(newFirstDayWeek.getTime() - 7*1000*3600*24);
	// console.log(someDay+"-->"+newFirstDayWeek);
	return newFirstDayWeek;
};
function getNextWeek(someDay){
	var newWeek = copyDate(someDay);
	newFirstDayWeek = getFirstDayWeek(newWeek);
	newFirstDayWeek.setTime(newFirstDayWeek.getTime() + 7*1000*3600*24);
	// console.log(someDay+"-->"+newFirstDayWeek);
	return newFirstDayWeek;
};
function isleap(year){
	if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0){
		return true;
	}
	else{
		return false;
	};
};
function getMonthsList(someDay){
	var february;
	if (isleap(someDay.getFullYear())===true){
		february=29
	}
	else{
		february=28
	};
	return [31,february,31,30,31,30,31,31,30,31,30,31];
};
function getFirstDayMonth(someDay){
	var firstDayMonth = copyDate(someDay);
	firstDayMonth.setTime(firstDayMonth.getTime() - (someDay.getDate()-1)*1000*3600*24);
	// console.log(someDay+"-->"+firstDayMonth);
	return firstDayMonth;
};
function getPreviousMonth(someDay){
	var newFirstDayMonth = getFirstDayMonth(new Date((getFirstDayMonth(someDay).getTime())-1000*3600*24));
	// console.log(someDay+"-->"+newFirstDayMonth);
	return newFirstDayMonth;
};
function getNextMonth(someDay){
	var nextMonth = copyDate(someDay);
	var monthLength = (getMonthsList(someDay)[someDay.getMonth()]);
	nextMonth.setTime(someDay.getTime()+((monthLength - someDay.getDate()+1)*1000*3600*24));
	// console.log((nextMonth));
	return nextMonth;
};
function getWeeksNumber(someDay){
	var dayInit = (getFirstDayMonth(someDay).getTime())-(getFirstDayMonth(someDay).getDay())*1000*3600*24;
	var nbWeeks = Math.ceil(((getMonthsList(someDay)[someDay.getMonth()])+
		((getFirstDayMonth(someDay).getTime()-
			dayInit)/1000/3600/24)) / 7);
	return nbWeeks
};
function getFirstDayViewMonth(someDay){
	var firstDayViewMonth = copyDate(someDay);
	var milliseconds = getFirstDayMonth(someDay).getTime()-(getFirstDayMonth(someDay).getDay())*1000*3600*24;
	// console.log(milliseconds);
	firstDayViewMonth.setTime(milliseconds);
	// console.log(firstDayViewMonth);
	return firstDayViewMonth;
}
//test------------------------test--------------------------test-------------------------
getWeeksNumber(new Date("June 12, 2019 00:00:00"));
// new Date("August 12, 2019 00:00:00")


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
function makeEditable(){
	$(".fullDayEventCell").hover(function(){
		$(this).css("cursor","pointer");
		},function(){
		$(this).css("cursor","default");
	});
	$(".eventCell").hover(function(){
		$(this).css("cursor","pointer");
		},function(){
		$(this).css("cursor","default");
	});
};



function openForm(placeToOpen){
	var values = new Date();
	values.setTime(placeToOpen.id);
	var popup = placeToOpen;
	popup.class += " popup";
	var popupWindow = document.getElementById("formEvent");
	//setting defaults values (date and hour)
	popupWindow[1].valueAsNumber = Number(placeToOpen.id)+2*3600*1000;
	popupWindow[3].valueAsNumber = Number(placeToOpen.id)+2*3600*1000;
	if (placeToOpen.className === "eventCell"){
		popupWindow[2].valueAsNumber = (values.getHours()*1000*3600);
		popupWindow[4].valueAsNumber = ((values.getHours()+1)*1000*3600);
	}
	else if (placeToOpen.className === "fullDayEventCell"){
		popupWindow[2].disabled = true;
		popupWindow[4].disabled = true;
		popupWindow[5].checked = true;
	}
	popupWindow[8].value = placeToOpen.id;
	// console.log(popupWindow[8]);
};

function getPosition(element){
	var left = 0;
	var top = 0;
	/*On récupère l'élément*/
	var e = element;
	/*Tant que l'on a un élément parent*/
	while (e.offsetParent != undefined && e.offsetParent != null){
		/*On ajoute la position de l'élément parent*/
		left += e.offsetLeft + (e.clientLeft != null ? e.clientLeft : 0);
		top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
		e = e.offsetParent;
	};
	return new Array(left,top);
};

function createNewEvent(form){
	var event = new CalEvent(formEvent[8].value,
					form[0].value,
					form[1].value,
					hourBeg = (form[2].value),
					dateEnd = (form[3].value),
					hourEnd = (form[4].value),
					fullDay = (form[5].checked),
					repeat = (form[6].checked),
					description = (form[7].value)
			);
	console.log(event);
	CalEventsList.push(event);
	console.log(CalEventsList);
};

function createCookie(name,value){
	document.cookie = name+" = "+escape(value);
	console.log("le cookie "+name+" a été récupéré");
};
