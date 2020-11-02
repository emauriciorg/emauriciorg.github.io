//
const searchBtn = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');



function search_meal(e){
	e.preventDefault();
	//single_mealEl.innerHTML ='';
	
	const ingridient = search.value;
	
	
	if(ingridient.trim()){
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingridient}`)
		.then(res=>res.json())
		.then(data=>{
			console.log(data);
			resultHeading.innerHTML=`<h2> Search Results for ${ingridient}</h2>`;
		
		
		if (data.meals === null){
			resultHeading.innerHTML=`<p>There are not results</p>`;	
		}else{
			mealsEl.innerHTML=data.meals.map(meal=>
			`
			<div class="meal">
			<img src="${meal.strMealThumb}" alt="${meal.strMealThumb}"/>
			<div class="meal-info" data-mealID="${meal.idMeal}">
			<h3> ${meal.strMeal}</h3>
			</div>
			</div>
			`
			).join('');
		}
		});
		search.value='';
	}else{
		alert('Please search a valid termn');
	}
	
}






submit.addEventListener('submit',search_meal);


