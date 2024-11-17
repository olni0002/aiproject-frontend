const paramSearch = new URLSearchParams(location.search);

const heading1 = document.createElement("h1");
const mealName = decodeURIComponent(paramSearch.get("meal"));
heading1.textContent = mealName;
document.body.append(heading1);

fetch(`http://localhost:8081/api/chat/${encodeURIComponent("Suggest ingredients and write a recipe for " + mealName)}`)
        .then(response => response.json())
        .then(obj => obj.choices[0].message.content)
        .then(printAiResponse);

function printAiResponse(aiResponse) {
    const text = document.createElement("p");
    text.textContent = aiResponse;
    text.style.whiteSpace = "pre-wrap";
    document.body.append(text);
}