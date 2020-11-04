const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('setting-button');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
	'rocket',
	'mars',
	'galaxy',
	'moon',
	'comet',
	'cosmic',
	'gravity'
];

let randomWord;
let score = 0;
let time = 10;
let difficulty = setDifficulty();


function setDifficulty(){
	difficultySelect.value = localStorage.getItem('difficulty') !==null? localStorage.getItem('difficulty'):'medium';
	return difficultySelect.value;
}
text.focus();

const timeInterval =  setInterval(updateTime,1000);

function updateTime(){
	
	time--;
	if(time === 0){
		clearInterval(timeInterval);
		gameOver();
	}
	timeEl.innerHTML = time+'s';	
};


function gameOver(){
	endgameEl.innerHTML=
	`
	<h1>Time Ran Out </h1>
	<p> Your final score is ${score}</p>
	<button onclick="location.reload()">Reload</button>
	`;
	endgameEl.style.display='flex';
}
function getRandomWord() {
	return words[Math.floor(Math.random()*words.length)];
}


function addWordToDOM() {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
}

function updateScore(){
	score++;
	scoreEl.innerHTML = score;
}

addWordToDOM();

settingsBtn.addEventListener('click',()=>{
	settings.classList.toggle('hide');
});

settingsForm.addEventListener('change',e=>{
	difficulty= e.target.value;
	localStorage.setItem('difficulty', difficulty);
});
text.addEventListener('input',e=>{
	const insertedText = e.target.value;
	if (insertedText == randomWord){
		addWordToDOM();
		updateScore();
		e.target.value='';
		if(difficulty === 'hard'){
			time+=1;
		}
		if(difficulty === 'medium'){
			time+=3;
		}
		if(difficulty === 'easy'){
			time+=5;
		}

		updateTime();
	}
});
