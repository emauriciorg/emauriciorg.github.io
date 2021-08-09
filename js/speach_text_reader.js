const main= document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('textarea');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
	{
		image: '/image/happy.jpg',
		text: "I'm happy"
	},
	{
		image: '/image/angry.jpg',
		text: "I'm angry"
	},
	{
		image: '/image/flattered.jpg',
		text: "I'm flattered"
	},
	{
		image: '/image/love.jpg',
		text: "I'm love"
	},
	{
		image: '/image/ok.jpg',
		text: "I'm ok"
	},
	{
		image: '/image/sad.jpg',
		text: "I'm sad"
	},
	{
		image: '/image/surprised.jpg',
		text: "I'm surprised"
	}
]


data.forEach(createBox);

function createBox(item){
	const box = document.createElement('div');
	const { image, text } = item;
	box.classList.add('box');
	box.innerHTML= 
	`
	<img src="${image}" alt=${text}"/>
	<p class="info">${text}</p>
	`;
	main.appendChild(box);
}

