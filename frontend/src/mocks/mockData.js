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

    folderGetFolderStructure: [
        { id: 1, name: 'Folder 1' },
        { id: 2, name: 'Folder 2' },
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
    ]

}

export default mockData;