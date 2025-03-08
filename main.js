// Your actual API keys
const WEATHER_API_KEY = '7a0afe885045b10fb944b648309c2342'; // OpenWeatherMap API key
const NEWS_API_KEY = 'bd9b8b7a514c4bd2a7c826785caf7f92'; // NewsAPI key

// Weather API URL (for India, you can change the city name)
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=New+Delhi&units=metric&appid=${WEATHER_API_KEY}`;

// News API URL for general news search
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=india&apiKey=${NEWS_API_KEY}`; // Search for articles related to 'india'

// Fetch Weather Data
const fetchWeather = async () => {
    try {
        const response = await fetch(WEATHER_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const weatherInfo = `
            <strong>${data.name}</strong><br>
            Temperature: ${data.main.temp}°C<br>
            Weather: ${data.weather[0].description}<br>
            Humidity: ${data.main.humidity}%
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById('weather-info').innerHTML = `<p>${error.message}</p>`;
    }
};

// Fetch News Data
const fetchNews = async () => {
    try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.articles || data.articles.length === 0) {
            throw new Error("No news articles found.");
        }
        displayNews(data.articles.slice(0, 5)); // Display first 5 news articles
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById("news-container").innerHTML = `<p>${error.message}</p>`;
    }
};

// Display News Articles
const displayNews = (articles) => {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear loading text

    articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
    });
};

// Fetch Headlines Data
const fetchHeadlines = async () => {
    try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.articles || data.articles.length === 0) {
            throw new Error("No headlines found.");
        }
        displayHeadlines(data.articles.slice(0, 5)); // Display first 5 headlines
    } catch (error) {
        console.error("Error fetching headlines:", error);
        document.getElementById("headlines-container").innerHTML = `<p>${error.message}</p>`;
    }
};

// Display Headlines
const displayHeadlines = (articles) => {
    const headlinesContainer = document.getElementById("headlines-container");
    headlinesContainer.innerHTML = ""; // Clear loading text

    articles.forEach(article => {
        const headlineItem = document.createElement("div");
        headlineItem.classList.add("headline-item");
        headlineItem.innerHTML = `
            <h3>${article.title}</h3>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        headlinesContainer.appendChild(headlineItem);
    });
};

// Call functions to fetch data when the page loads
window.onload = () => {
    fetchWeather();
    fetchNews();
    fetchHeadlines();
};
