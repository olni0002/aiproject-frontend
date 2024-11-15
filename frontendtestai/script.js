// Fetch categories on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log("Fetching categories...");
    fetch('http://localhost:8081/meal-categories')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not OK");
            return response.json();
        })
        .then(data => {
            console.log("Categories fetched:", data);
            const categoriesDiv = document.getElementById('categories');
            const categories = data.meals; // Adjust this if API structure changes
            if (!categories || categories.length === 0) {
                categoriesDiv.innerText = "No categories found.";
                return;
            }
            categories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = 'category';
                categoryElement.innerText = category.strCategory;
                categoryElement.addEventListener('click', () => fetchMeals(category.strCategory));
                categoriesDiv.appendChild(categoryElement);
            });
        })
        .catch(err => console.error('Error fetching categories:', err));
});

// Fetch meals for the selected category
function fetchMeals(category) {
    console.log(`Fetching meals for category: ${category}`);
    fetch(`http://localhost:8081/meals/${category}`)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not OK");
            return response.json();
        })
        .then(data => {
            console.log(`Meals fetched for ${category}:`, data);
            const mealsDiv = document.getElementById('meals');
            mealsDiv.innerHTML = ''; // Clear previous meals

            const meals = data.meals; // Adjust this if API structure changes
            if (!meals || meals.length === 0) {
                mealsDiv.innerText = `No meals found for category: ${category}`;
                return;
            }
            meals.forEach(meal => {
                const mealElement = document.createElement('div');
                mealElement.className = 'meal';
                mealElement.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <span>${meal.strMeal}</span>
                    <button class="save-meal-btn">Save Meal</button>
                `;

                // Add event listener to the button
                const button = mealElement.querySelector('.save-meal-btn');
                button.addEventListener('click', () => {
                    saveMeal(meal);
                });

                mealsDiv.appendChild(mealElement);
            });
        })
        .catch(err => console.error('Error fetching meals:', err));
}

// Save meal data to console
function saveMeal(meal) {
    console.log("Saved meal data:", meal);
}