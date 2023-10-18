export function saveToLocalStorageByName(pokeName) {
    let favorites = getLocalStorage();
    if (favorites.includes(pokeName.pokeName && pokeName.pokeId)) {
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
    const favorites = getLocalStorage();
    const updatedFavorites = favorites.filter((item) => item.pokeName !== name.pokeName);
    localStorage.setItem('Favorites', JSON.stringify(updatedFavorites));
}

export function SaveSortTypeToLocalStorage(sortType) {
    localStorage.setItem('SortValue', sortType);
}