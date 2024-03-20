// Wrap pokemonRepository in an IIFE to encapsulate the data and functions
let pokemonRepository = (function() {
    let pokemonList = []; // Initialize an empty array to store Pokémon data

    // Function to fetch Pokémon data from the API
    async function loadPokemonList() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150'); // Fetch the first 150 Pokémon
            const data = await response.json(); // Extract JSON data from the response
            pokemonList = data.results; // Update pokemonList with the fetched Pokémon data
            return pokemonList;
        } catch (error) {
            console.error('Error loading Pokémon data:', error);
        }
    }

    // Function to render Pokémon buttons
    function addListItem(pokemon) {
        const pokemonListElement = document.getElementById('pokemonList');

        // Create li element
        const listItem = document.createElement('li');

        // Create button element
        const button = document.createElement('button');
        button.innerText = pokemon.name; // Set button text to Pokémon name

        // Append button to li
        listItem.appendChild(button);

        // Append li to ul
        pokemonListElement.appendChild(listItem);

        // Add event listener to the button
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    // Function to display Pokémon details when a button is clicked
    function showDetails(pokemon) {
        console.log(pokemon);
        // Further functionality to show details will be added in later tasks
    }
    

    return {
        load: loadPokemonList, // Expose the load function to fetch Pokémon data
        addListItem: addListItem, // Expose the addListItem function to render Pokémon buttons
    };
})();

// Load Pokémon data from the API and render buttons
pokemonRepository.load().then(function(pokemonList) {
    pokemonList.forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
