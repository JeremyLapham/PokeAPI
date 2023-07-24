export function saveToLocalStorageByName(pokeName) {
    let favorites = getLocalStorage();
    if (favorites.includes(pokeName)) {
        return;
    }
    favorites.push(pokeName);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

export function getLocalStorage() {
    let localStorageData = localStorage.getItem('Favorites');
    if (localStorageData == null) {
        return [];
    }
    return JSON.parse(localStorageData);
}

export function removeFromLocalStorage(name) {
    let favorites = getLocalStorage();
    let pokeNameIndex = favorites.indexOf(name);
    favorites.splice(pokeNameIndex, 1);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}