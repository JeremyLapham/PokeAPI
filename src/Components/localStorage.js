export function saveToLocalStorageByName(pokeName) {
    let favorites = getLocalStoage();
    if (favorites.includes(pokeName)) {
        return;
    }
    favorites.push(pokeName);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

export function getLocalStoage() {
    let localStorageData = localStorage.getItem('Favorites');
    if (localStorageData == null) {
        return [];
    }
    return JSON.parse(localStorageData);
}

export function removeFromLocalStorage(name) {
    let favorites = getLocalStoage();
    let pokeNameIndex = favorites.indexOf(name);
    favorites.splice(pokeNameIndex, 1);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}