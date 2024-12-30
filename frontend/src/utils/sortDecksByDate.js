const sortDecksByDate = (decks) => {
    let sortedDeck = decks.slice();

    sortedDeck.sort((a, b) => {
        const dateA = new Date(a.lastUsed);
        const dateB = new Date(b.lastUsed);
        return dateB - dateA;
    })

    return sortedDeck
}

export default sortDecksByDate;