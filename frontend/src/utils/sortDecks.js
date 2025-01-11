const dateEval = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
}

const sortDecks = (decks, sortOptions) => {
    let sortedDecks = decks.slice();

    return sortedDecks.sort((a, b) => {
    let result = 0;

    // {
    //     alphabet: false,
    //     recentUsage: false,
    //     creationDate: false,
    //     learningProgress: false,
    //     lastModified: false,
    //     reversed: false,
    // }

    if (sortOptions.alphabet && result === 0)
    {
        result = a.title.localeCompare(b.title);
    }
    if (sortOptions.recentUsage && result === 0)
    {
        result = dateEval(a.lastUsed, b.lastUsed);
    }
    if (sortOptions.creationDate && result === 0)
    {
        result = dateEval(a.createdAt, b.createdAt);
    }
    if (sortOptions.learningProgress && result === 0)
    {
        result = b.progress - a.progress;
    }
    if (sortOptions.lastModified && result === 0)
    {
        result = dateEval(a.lastModified, b.lastModified);
    }
    if (sortOptions.reversed) {
        result = -result;
    }

    return result;

    });
}

export default sortDecks;