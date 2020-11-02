//
const searchBtn = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');


function getMealById(mealID) {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
		.then(res=>res.json())
		.then(data=>{
			const meal = data.meals[0];			
			addMealToDOM(meal);
		});
}


function addMealToDOM(meal) {
	const ingredients= [];	
	for(let i = 1; i<=20;i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]}- ${meal[`strMeasure${i}`]}`);
		}else{
			break;
		}
	}
	
	single_mealEl.innerHTML = `
	<div class="single-meal">
		<h1>${meal.strMeal}</h1>
		<img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
		<div class="single-meal-info">
			${meal.strCategory? `<p>${meal.strCategory}</p>`:''}
			${meal.strArea? `<p>${meal.strArea}</p>`:''}
		</div>
		
		<div class="main">
			<p>${meal.strInstructions}</p>
			<h2> Ingredients</h2>
			<ul>
			${ingredients.map(ing=>`<li>${ing}</li>`).join('')}
			</ul>
		</div>
	</div>`;
}

function getRandomMeal(){
	mealsEl.innerHTML='';
	resultHeading.innerHTML='';
	
	fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
	.then(res=>res.json())
	.then(data=>{
		const meal = data.meals[0];
		addMealToDOM(meal);	
	});
	
}

function search_meal(e) {
	e.preventDefault();
	//single_mealEl.innerHTML ='';
	
	const ingredient = search.value;
	
	
	if(ingredient.trim()) {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
		.then(res=>res.json())
		.then(data=>{
			resultHeading.innerHTML=`<h2> Search Results for ${ingredient}</h2>`;
		
		
		if (data.meals === null) {
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





random.addEventListener('click',getRandomMeal);
submit.addEventListener('submit',search_meal);
mealsEl.addEventListener('click',e=>{
	const mealInfo = e.path.find(item=>{
		if(item.classList) {
			return item.classList.contains('meal-info');
		}
	});
	
	if(mealInfo) {
		const mealID= mealInfo.getAttribute('data-mealid');
		getMealById(mealID);
	}
});


