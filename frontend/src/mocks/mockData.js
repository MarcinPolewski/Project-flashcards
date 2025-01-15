import testAvatar from "../assets/test/test-avatar.png";

const mockData = {
    deckGetLastUsed: [
        { id: 1, name: 'Deck 1', progress: 50 },
        { id: 2, name: 'Deck 2', progress: 75 },
        { id: 3, name: 'Deck 3', progress: 75 },
    ],

    deckGetAllDecks: [
        {
            id: 1,
            name: "Japanese N5",
        },
        {
            id: 2,
            name: "Owoce",
        },
        {
            id: 3,
            name: "Warzywa",
        },
        {
            id: 4,
            name: "English Grammar",
        },
        {
            id: 5,
            name: "Spanish N5",
        },
        {
            id: 6,
            name: "Kanji Level 1",
        },
        {
            id: 7,
            name: "French A2",
        },
        {
            id: 8,
            name: "Imported Japanese N5",
        },
        {
            id: 9,
            name: "Imported Owoce",
        },
        {
            id: 10,
            name: "Imported Warzywa",
        }
    ],

    deckGetAllDecksInfo: [
        {
            id: 1,
            name: "Japanese N5",
            newCards: 50,
            learningCards: 25,
            reviewingCards: 200,
            progress: 70,
            createdAt: "2023-11-01",
            lastUsed: "2023-11-20",
            lastModified: "2023-11-05"
        },
        {
            id: 2,
            name: "Owoce",
            newCards: 40,
            learningCards: 15,
            reviewingCards: 180,
            progress: 65,
            createdAt: "2023-10-15",
            lastUsed: "2023-11-10",
            lastModified: "2023-10-25"
        },
        {
            id: 3,
            name: "Warzywa",
            newCards: 60,
            learningCards: 35,
            reviewingCards: 180,
            progress: 80,
            createdAt: "2023-09-20",
            lastUsed: "2023-11-15",
            lastModified: "2023-11-03",

        },
        {
            id: 4,
            name: "English Grammar",
            newCards: 35,
            learningCards: 50,
            reviewingCards: 150,
            progress: 60,
            createdAt: "2023-08-10",
            lastUsed: "2023-11-17",
            lastModified: "2023-11-10",

        },
        {
            id: 5,
            name: "Spanish N5",
            newCards: 50,
            learningCards: 20,
            reviewingCards: 170,
            progress: 72,
            createdAt: "2023-09-25",
            lastUsed: "2023-11-18",
            lastModified: "2023-11-07",

        },
        {
            id: 6,
            name: "Kanji Level 1",
            newCards: 80,
            learningCards: 40,
            reviewingCards: 300,
            progress: 85,
            createdAt: "2023-07-15",
            lastUsed: "2023-11-19",
            lastModified: "2023-11-10",

        },
        {
            id: 7,
            name: "French A2",
            newCards: 55,
            learningCards: 25,
            reviewingCards: 210,
            progress: 78,
            createdAt: "2023-06-12",
            lastUsed: "2023-11-12",
            lastModified: "2023-11-02",
        },
        {
            id: 8,
            name: "Imported Japanese N5",
            newCards: 50,
            learningCards: 25,
            reviewingCards: 200,
            progress: 70,
            createdAt: "2023-11-01",
            lastUsed: "2023-11-20",
            lastModified: "2023-11-05",

        },
        {
            id: 9,
            name: "Imported Owoce",
            newCards: 50,
            learningCards: 25,
            reviewingCards: 200,
            progress: 70,
            createdAt: "2023-10-15",
            lastUsed: "2023-11-10",
            lastModified: "2023-10-25",
        },
        {
            id: 10,
            name: "Imported Warzywa",
            newCards: 50,
            learningCards: 25,
            reviewingCards: 200,
            progress: 70,
            createdAt: "2023-09-20",
            lastUsed: "2023-11-15",
            lastModified: "2023-11-03",
        }
    ],

    folderGetFolderStructure: [
        { id: 1, name: 'Folder 1' },
        { id: 2, name: 'Folder 2' },
    ],

    folderGetDecksInfo: [
        {
            id: 1,
            name: "Japanese N5",
            newCards: 50,
            learningCards: 25,
            reviewingCards: 200,
            progress: 70
        },
        {
            id: 2,
            name: "Chinese",
            newCards: 50,
            learningCards: 25,
            reviewingCards: 200,
            progress: 70
        },
        {
            id: 3,
            name: "Javascript",
            newCards: 50,
            learningCards: 25,
            reviewingCards: 200,
            progress: 70
        },
        {
            id: 4,
            name: "Operating Systems",
            newCards: 50,
            learningCards: 25,
            reviewingCards: 200,
            progress: 70
        },
    ],

    customerGetSelf: {
        username: "Kacper",
        email: "kerciuuu@gmail.com",
        avatar: testAvatar
    },

    userStatisticsGetUserStatistics: {
        daysLearning: 15,
        longestStreak: 15,
        currentStreak: 8,
        allNewCards: 57,
        allLearningCards: 120,
        allRememberedCards: 217,
        loginDates: [
            '10-12-2024', '11-12-2024', '14-12-2024', '15-12-2024',
            '16-12-2024', '18-12-2024', '19-12-2024', '20-12-2024',
            '21-12-2024', '22-12-2024', '24-12-2024', '25-12-2024',
            '26-12-2024', '28-12-2024', '30-12-2024', '01-01-2025',
            '03-01-2025', '05-01-2025', '06-01-2025', '07-01-2025'
        ]
    },

    userPreferencesGetUserPreferences: {
        darkMode: true,
        language: 'en-UK',
        reminderTime: '08:00',
        timezone: 'GMT+1',
        studyReminders: true,
    },

    customerGetNotifications: [
        { id: 1, text: 'Hello this is your mocked data' },
        { id: 2, text: 'Spanish or vanish' },
    ],

    reviewRequest:   {
        flashcards: [
            {
                "id": 1,
                "deckId": 2,
                "front": "apple",
                "back": "jabłko"
            },
            {
                "id": 2,
                "deckId": 2,
                "front": "banana",
                "back": "banan"
            },
            {
                "id": 3,
                "deckId": 2,
                "front": "tomato",
                "back": "pomidor"
            },
            {
                "id": 4,
                "deckId": 2,
                "front": "peach",
                "back": "brzoskwinia"
            },
            {
                "id": 5,
                "deckId": 2,
                "front": "cucumber",
                "back": "ogorek"
            },
            {
                "id": 6,
                "deckId": 2,
                "front": "pomegranate",
                "back": "granat"
            },
        ]
    }
}

export default mockData;