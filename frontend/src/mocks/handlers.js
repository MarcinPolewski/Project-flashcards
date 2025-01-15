import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../api/api';

import testAvatar from '../assets/test/test-avatar.png';

export const handlers = [
        http.get(API_BASE_URL + '/deck/getLastUsed', () => {
            return HttpResponse.json([
                { id: 1, name: 'Deck 1', progress: 50 },
                { id: 2, name: 'Deck 2', progress: 75 },
                { id: 3, name: 'Deck 3', progress: 75 },
            ]);
        }),
        http.get(API_BASE_URL + '/customer/getSelf', () => {
            return HttpResponse.json({
                username: "Kacper",
                email: "kerciuuu@gmail.com",
                avatar: testAvatar
            });
        }),
        http.get(API_BASE_URL + '/userStatistics/getUserStatistics', () => {
            return HttpResponse.json(
                {
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
                }
            )
        }),
        http.get(API_BASE_URL + '/userPreferences/getUserPreferences/', () => {
            return HttpResponse.json({
                darkMode: true,
                language: 'en-UK',
                reminderTime: '08:00',
                timezone: 'GMT+1',
                studyReminders: true,
              });
          }),
          http.get(API_BASE_URL + '/customer/getNotifications/', () => {
            return HttpResponse.json([
                { id: 1, text: 'Hello this is your mocked data' },
                { id: 2, text: 'Spanish or vanish' },
              ]);
          }),
          http.get(API_BASE_URL + '/folder/getFolderStructure', () => {
            return HttpResponse.json([
                { id: 1, name: 'Folder 1' },
                { id: 2, name: 'Folder 2' },
              ]);
          }),
]