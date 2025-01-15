import { http } from 'msw';

import testAvatar from '../assets/test/test-avatar.png';

// Mockowanie odpowiedzi na zapytania GET, POST, PUT, DELETE

export const handlers = [
  http.get('http://localhost:8080/api/auth/deck/getLastUsed', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Deck 1', progress: 50 },
        { id: 2, name: 'Deck 2', progress: 75 },
        { id: 3, name: 'Deck 3', progress: 75 },
      ])
    );
  }),
  http.get('http://localhost:8080/api/auth/folder/folderStructure', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Folder 1' },
        { id: 2, name: 'Folder 2' },
      ])
    );
  }),
  http.get('http://localhost:8080/api/auth/customer/getSelf', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'Kacper',
        email: 'Kerciuuu@gmail.com',
        avatar: testAvatar
    })
    );
  }),
  http.get('http://localhost:8080/api/auth/customer/getNotifications/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, text: 'Hello this is your mocked data' },
        { id: 2, text: 'Spanish or vanish' },
      ])
    );
  }),
  http.get('http://localhost:8080/api/auth/userPreferences/getUserPreferences/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        darkMode: true,
        language: 'en-UK',
        reminderTime: '08:00',
        timezone: 'GMT+1',
        studyReminders: true,
      })
    );
  }),
  http.get('http://localhost:8080/api/auth/userStatistics/getUserStatistics/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
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
    })
    );
  }),

];
