"use strict";

let pairs=0;		 //pairs of figures to be created
let matches=0;     //counts the amount of pairs matched 
let selected1=null;    //first figure selected
let selected2=null;    //second figure selected
let arrGI=[];       //array containing all de figures/GI (short for grid-item)
let waitTime=1;     //times in seconds that the game waits before hidding the images back
let startTime;      //Date() when the game begun
let finishTime;     //Date() when the game finished
let theme="cars";    //img set and color scheme


function shuffle(array) {
//randomizes the order of the figures in the array
  let currentIndex = array.length,  randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function setTheme() {
//restarts the game, sets the color of the divs
	startGame();
	if (theme=="cars"){
		settingsDiv.style.backgroundColor="#ff3";
		gridContainer.style.backgroundColor="#aaa"
	}
	if (theme=="landscapes"){
		settingsDiv.style.backgroundColor="#705820";
		gridContainer.style.backgroundColor="#71cbff"
	}
	if (theme=="music"){
		settingsDiv.style.backgroundColor="#ff7c00";
		gridContainer.style.backgroundColor="#c6ff65"
	}
}

function setUpGridContainer() {
//sets the columns and rows sizes according to the amount of pairs
	if (pairs==12) {
		gridContainer.style.gridTemplateColumns="repeat(6,1fr)";
		gridContainer.style.gridTemplateRows="repeat(4,21.5vh)";
	}
	if (pairs==6){
		gridContainer.style.gridTemplateColumns="repeat(4,1fr)";
		gridContainer.style.gridTemplateRows="repeat(3,28.5vh)";
	}
	if (pairs==3){
		gridContainer.style.gridTemplateColumns="repeat(3,1fr)";
		gridContainer.style.gridTemplateRows="repeat(2,43vh)";
	}
}


function gameReset() {
//resets variables
	selected1=null;
	selected2=null;
	matches=0;
//resets time
	startTime=new Date();
//eliminates grid-items from the grid-container
	for (let i = arrGI.length - 1; i >= 0; i--) {
		arrGI[i].remove();
	}
//empties the array
	arrGI=[];
}


function startGame(){

	setUpGridContainer();
	overlay.style.display="none";
	gameOverScreen.style.display="none";
	gameReset();

//creates grid-items with an <img> and assing them id,class and image in pairs
	for (let i =0 ; i<(pairs*2); i++) {
	arrGI[i]=document.createElement("div");
	arrGI[i].className=`grid-item-${theme}`;
	let n=i/2;
	n=Math.floor(n);
	arrGI[i].id=`gi${n}`;
	let imgGI=document.createElement("img");
	imgGI.className=`imgGI`;
	arrGI[i].appendChild(imgGI);
	imgGI.setAttribute("src",`images/${theme}/imggi${n}.png`);
	}

	shuffle(arrGI);

	for (let j = arrGI.length - 1; j >= 0; j--) {
		gridContainer.appendChild(arrGI[j]);
		arrGI[j].addEventListener("click",()=>{selectGI(arrGI[`${j}`])});
	}
}


function selectGI(n){
//registers the selected figure
	if (selected1==null){
		selected1=n;
		showGI(n);
	}
	else{
		selected2=n;;
		showGI(n)
		compare();
	}
}


function showGI(n){
//reveals figure image
	n.firstElementChild.style.display="block";
}


function resetGI(){
//blocks user input and hides figures that were selected
	selected1.firstElementChild.style.display="none";
	selected2.firstElementChild.style.display="none";
	selected1=null;
	selected2=null;
	overlay.style.display="none";
	timeBar.style.display="none";

}


function gameOver(){
	
	matches=0;

//calculates time
	finishTime=new Date();
	let timeElapsed= finishTime - startTime;
	let sec=Math.floor(timeElapsed/1000);
	let min=Math.floor(sec/60);
	sec=sec-(min*60);

//shows game over screen
	overlay.style.display="block";
	gameOverScreen.style.display="block";
	goTime.innerHTML=`Your time: ${min}' ${sec}''`;
}


function compare(){
//checks if the two selected figures match
	if (selected1.id==selected2.id){
		matches++;
		if (matches==pairs) gameOver();
		selected1.style.pointerEvents="none";
		selected2.style.pointerEvents="none";
		selected1=null;
		selected2=null;
	}
	else{
		overlay.style.display="block";
		timeBar.style.display="block";
		setTimeout(resetGI,waitTime*1000); //prevents user input for 1,5s then hides the figures
	}
}


const button3=document.getElementById("3pairs");
const button6=document.getElementById("6pairs");
const button12=document.getElementById("12pairs");
const gridContainer=document.getElementById("grid-container");
const overlay=document.getElementById("overlay");
const gameOverScreen=document.getElementById("overlay__gameOver");
const goTime=document.getElementById("overlay__gameOver-time");
const retry=document.getElementById("overlay__retry");
const cars=document.getElementById("carsTheme");
const landscapes=document.getElementById("landscapesTheme");
const music=document.getElementById("musicTheme");
const settingsDiv=document.getElementById("settings-div");
const timeBar=document.getElementById("overlay__timeBar");

button3.addEventListener("click",()=>{pairs=3; startGame()});
button6.addEventListener("click",()=>{pairs=6; startGame()});
button12.addEventListener("click",()=>{pairs=12; startGame()});
retry.addEventListener("click",()=>{startGame()});
cars.addEventListener("click",()=>{theme="cars"; setTheme()});
landscapes.addEventListener("click",()=>{theme="landscapes"; setTheme()});
music.addEventListener("click",()=>{theme="music"; setTheme()});

timeBar.style.animationDuration=`${waitTime}s`;
