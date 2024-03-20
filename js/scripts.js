// Define pokemonRepository object
let pokemonRepository = (function() {
    let pokemonList = []; // Array to store Pokémon data

    // Function to add a single Pokémon to the pokemonList array
    function add(pokemon) {
        // Check if the input is an object and has required properties
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.error('Invalid Pokémon object:', pokemon);
        }
    }

    // Function to return all Pokémon in the pokemonList array
    function getAll() {
        return pokemonList;
    }

    // Function to fetch the complete list of Pokémon from the API
    function loadList() {
        return fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(response => response.json())
            .then(data => {
                data.results.forEach(pokemon => {
                    // Add Pokémon name and details URL to pokemonList
                    add({
                        name: pokemon.name,
                        detailsUrl: pokemon.url
                    });
                });
            })
            .catch(error => {
                console.error('Error loading Pokémon list:', error);
            });
    }

    // Function to load details of a specific Pokémon
    function loadDetails(pokemon) {
        return fetch(pokemon.detailsUrl)
            .then(response => response.json())
            .then(data => {
                // Assign some details to the Pokémon in pokemonList
                pokemon.imgUrl = data.sprites.front_default;
                pokemon.height = data.height;
            })
            .catch(error => {
                console.error('Error loading Pokémon details:', error);
            });
    }

    // Return public functions
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

// Function to create and show modal with Pokémon details
function showModal(pokemon) {
    // Create modal element
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Create modal content
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Add Pokémon name to modal content
    let nameElement = document.createElement('h2');
    nameElement.textContent = 'Name: ' + pokemon.name;
    modalContent.appendChild(nameElement);

    // Add Pokémon height to modal content
    let heightElement = document.createElement('p');
    heightElement.textContent = 'Height: ' + pokemon.height;
    modalContent.appendChild(heightElement);

    // Add Pokémon image to modal content
    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imgUrl;
    imgElement.alt = pokemon.name;
    modalContent.appendChild(imgElement);

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Append modal to body
    document.body.appendChild(modal);

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });

    // Close modal when pressing ESC key
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(modal);
        }
    });
}

// Function to close modal
function closeModal(modal) {
    modal.remove();
}

// Call loadList to fetch the Pokémon list from the API
pokemonRepository.loadList().then(() => {
    // Execute getAll to get all Pokémon from the repository
    let allPokemon = pokemonRepository.getAll();

    // Loop through each Pokémon and add them to the list on the webpage
    allPokemon.forEach(pokemon => {
        addListItem(pokemon);
    });
});

// Function to display Pokémon details and show modal when a Pokémon button is clicked
function showDetails(pokemon) {
    // Call loadDetails to load details of the selected Pokémon
    pokemonRepository.loadDetails(pokemon).then(() => {
        // Show modal with Pokémon details
        showModal(pokemon);
    });
}

// Function to add a list item for Pokémon
function addListItem(pokemon) {
    let pokemonList = document.getElementById('pokemonList');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    button.addEventListener('click', function() {
        showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
}
