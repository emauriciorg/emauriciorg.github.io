const wordEl = document.getElementById('word');
const wronglettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words=['youtube','microcontroller', 'apartment', 'tech'];

let selectedWord = words[Math.floor(Math.random()* words.length)];

const correctLetters = [];
const wrongLetters = [];


function displayWord(){
	wordEl.innerHTML = `
	${selectedWord
	.split('')
	.map(letter=>`<span class="letter">
	${correctLetters.includes(letter)?letter:''}
	</span>`).join('')
	}`;

	const innerWord =wordEl.innerText.replace(/\n/g,'');

	if (innerWord === selectedWord){
		finalMessage.innerText='Congratulations!';
		popup.style.display   ='flex';
	}
}

function showNotification(){
	notification.classList.add('show');
	setTimeout(()=>{
		notification.classList.remove('show');
	},2000);	
}

function updateWrongLettersEl(){
	
	/*Display wrong letters */
	wronglettersEl.innerHTML=
	`${wrongLetters.length>0?'<p>Wrong</p>':''}
	${wrongLetters.map(letter=>`<span>${letter}</span>`)}
	`;	

	/*display parts */
	figureParts.forEach((parts,index)=>{
		const errors= wrongLetters.length;
		if(index < errors){
			parts.style.display='block';
		}
		else
		{
			parts.style.display='none';
		}
	});

	/*Check if lost*/
	if(wrongLetters.length == figureParts.length){
		finalMessage.innerText= "You are dead";
		popup.style.display = 'flex';
	}	
	
}

function playAgain (){
	correctLetters.splice(0);
	wrongLetters.splice(0);
	selectedWord= words[Math.floor(Math.random()* words.length)];
	displayWord();
	updateWrongLettersEl();
	popup.style.display= 'none';
}


playAgainBtn.addEventListener('click',playAgain);

window.addEventListener('keydown',e => {
	
	if((e.keyCode >= 65) && (e.keyCode <=90)){
		const letter= e.key;
		if(selectedWord.includes(letter)){
			if(!correctLetters.includes(letter)){
				correctLetters.push(letter);
				displayWord();
			}else{
				showNotification();
			}
		}else{
			if(!wrongLetters.includes(letter)){
				wrongLetters.push(letter);
				updateWrongLettersEl();				
			}else{
				showNotification();
			}
		}
	}
});







displayWord();