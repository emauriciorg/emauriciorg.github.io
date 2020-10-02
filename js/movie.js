const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

/*parseint or add + to convert to number */
let ticketPrice = +movieSelect.value;


function setMovieData(movieIndex,moviePrice){
	localStorage.setItem('selectedMovieIndex',movieIndex);
	localStorage.setItem('moviePrice',moviePrice);
}


function updateSelectedCount(){
	const seletedSeats = document.querySelectorAll('.row .seat.selected');
	//console.log(seletedSeats);

		//can written as a function map

	// const seatIndex = [...seletedSeats].map(function(seat){
		// return [...seats.indexof(seat)];
	// });
	const seatIndex = [...seletedSeats].map(seat =>[...seats].indexOf(seat));

	localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));	

	const selectedSeatsCount = seletedSeats.length;
	count.innerText-selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
	
}

function populateUI(){
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	const selectedMoviePrice = localStorage.getItem('moviePrice');
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

	
	if (selectedSeats !==null && selectedSeats.length>0){
		seats.forEach((seat,index)=>{
			if(selectedSeats.indexOf(index)> -1){
				seat.classList.add('selected');
			}
		});
	}
	if (selectedMovieIndex !==null){
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}


movieSelect.addEventListener('change',e=>{
	ticketPrice= +e.target.value;
	setMovieData(e.target.selectedIndex,e.target.value);
	updateSelectedCount();
})
container.addEventListener('click', e=>{
	if (e.target.classList.contains('seat') &&
	!e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected');
	
		updateSelectedCount();
	}
});


//Initial count and total set

updateSelectedCount();


//todo add print ticket/bill and confirm. use backend
//after this seats pass from selected to occupied