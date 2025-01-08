const spanishN5MockDeck = {
    id: 5,
    title: "Spanish N5",
    newCards: [
        { id: 1, front: "Hola", back: "Hello", nextReview: null },
        { id: 2, front: "Gracias", back: "Thank you", nextReview: null },
        { id: 3, front: "Adiós", back: "Goodbye", nextReview: null },
        { id: 4, front: "Por favor", back: "Please", nextReview: null },
        { id: 5, front: "Buenos días", back: "Good morning", nextReview: null },
    ],
    reviewingCards: [
        { id: 6, front: "La casa", back: "The house", nextReview: "2023-11-15" },
        { id: 7, front: "El coche", back: "The car", nextReview: "2023-11-16" },
        { id: 8, front: "El gato", back: "The cat", nextReview: "2023-11-14" },
        { id: 9, front: "El perro", back: "The dog", nextReview: "2023-11-13" },
        { id: 10, front: "El libro", back: "The book", nextReview: "2023-11-12" },
    ],
    progress: 72,
    imported: false,
    createdAt: "2023-09-25",
    lastUsed: "2023-11-18",
    lastModified: "2023-11-07"
};

export default spanishN5MockDeck;