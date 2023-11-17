document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    let dogBreeds = []; // To store the full list of dog breeds

    // Function to fetch and add images and breeds
    const fetchAndAddData = () => {
        // Fetch dog images
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                const imageUrls = data.message;
                const imageContainer = document.getElementById('dog-image-container');

                imageUrls.forEach(url => {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = 'Dog Image';
                    imageContainer.appendChild(img);
                });
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });

        // Fetch dog breeds
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = Object.keys(data.message);
                const breedList = document.getElementById('dog-breeds');
                dogBreeds = breeds; // Store the full list of dog breeds

                breeds.forEach(breed => {
                    const breedItem = document.createElement('li');
                    breedItem.textContent = breed;
                    breedList.appendChild(breedItem);
                });

                // Add a click event listener to change the font color
                breedList.addEventListener('click', (event) => {
                    const clickedListItem = event.target;
                    clickedListItem.style.color = 'green';
                });

                // Add an input event listener to the filter input
                const filterInput = document.getElementById('filter-input');
                filterInput.addEventListener('input', () => {
                    const selectedLetter = filterInput.value.toLowerCase();
                    updateBreedList(selectedLetter);
                });
            })
            .catch(error => {
                console.error('Error fetching breeds:', error);
            });
    };

    // Function to update the breed list based on the starting letter
    function updateBreedList(selectedLetter) {
        const breedList = document.getElementById('dog-breeds');
        breedList.innerHTML = '';

        const filteredBreeds = dogBreeds.filter(breed =>
            breed.toLowerCase().startsWith(selectedLetter)
        );

        filteredBreeds.forEach(breed => {
            const listItem = document.createElement('li');
            listItem.textContent = breed;
            breedList.appendChild(listItem);
        });
    }

    // Call the function to fetch and add images and breeds on page load
    fetchAndAddData();
});
