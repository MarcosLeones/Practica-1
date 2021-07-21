"use strict";

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

function setUpGC() {
	if (pairs==12) gc.style.gridTemplateColumns="1fr 1fr 1fr 1fr";
	else gc.style.gridTemplateColumns="1fr 1fr 1fr";
}

function gameReset() {
	selected1=null;
	selected2=null;
	matches=0;
	startTime=new Date();
	for (let i = arrGI.length - 1; i >= 0; i--) {
		arrGI[i].remove();
	}
	arrGI=[];
}

function startGame(){
	setUpGC();
	ol.style.display="none";
	go.style.display="none";
	gameReset();
	for (let i =0 ; i<(pairs*2); i++) {
	arrGI[i]=document.createElement("div");
	arrGI[i].className="grid-item";
	let n=i/2;
	n=Math.floor(n);
	arrGI[i].id=`gi${n}`;
	}
	shuffle(arrGI);
	for (let j = arrGI.length - 1; j >= 0; j--) {
		gc.appendChild(arrGI[j]);
		arrGI[j].addEventListener("click",()=>{selectGI(arrGI[`${j}`])});
	}
};

function selectGI(n){
	if (selected1==null){
		selected1=n;
		showGI(n);
	}
	else{
		selected2=n;;
		showGI(n)
		compare();
	};

};

function showGI(n){
	let id=n.id;
	n.style.backgroundImage=`url(images/cars/img${id}.png)`;
}

function resetGI(){
	selected1.style.backgroundImage="url(images/cars/texture.png)";
	selected2.style.backgroundImage="url(images/cars/texture.png)";
	selected1=null;
	selected2=null;
	ol.style.display="none";
}

function gameOver(){
	matches=0;
	finishTime=new Date();
	let timeElapsed= finishTime - startTime;
	let sec=Math.floor(timeElapsed/1000);
	let min=Math.floor(sec/60);
	sec=sec-(min*60);
	ol.style.display="block";
	go.style.display="block";
	goTime.innerHTML=`Your time: ${min}' ${sec}s`;
}

function compare(){
	if (selected1.id==selected2.id){
		matches++;
		console.log(matches);
		if (matches==pairs) gameOver();
		selected1.style.pointerEvents="none";
		selected2.style.pointerEvents="none";
		selected1=null;
		selected2=null;
	}
	else{
		ol.style.display="block";
		setTimeout(resetGI,1500);
	}
}


let matches=0;
let pairs=0;
let selected1=null;
let selected2=null;
let arrGI=[];
let startTime;
let finishTime;

const b3=document.getElementById("3pairs");
const b6=document.getElementById("6pairs");
const b12=document.getElementById("12pairs");

b3.addEventListener("click",()=>{pairs=3; startGame()});
b6.addEventListener("click",()=>{pairs=6; startGame()});
b12.addEventListener("click",()=>{pairs=12; startGame()});

const gc=document.getElementById("grid-container");
const ol=document.getElementById("overlay");
const go=document.getElementById("gameOver");
const goTime=document.getElementById("gameOver-time");
const retry=document.getElementById("retry");

retry.addEventListener("click",()=>{startGame()});




