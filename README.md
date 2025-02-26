# Temat projektu: Aplikacja webowa do nauki z wykorzystaniem fiszek

### Inspiracje
- Anki
- Quizlet

### Architektura
Zgodnie z wymaganiami projektu wykorzystamy architekturę 3-warstwową, w której baza danych jest oddzielona od logiki biznesowej i interfejsu użytkownika.

### Struktura bazy danych
![database_schema](result/database_schema.jpg)

### Zespół
- Julia Czosnek
- Kacper Górski
- Marcin Polewski
- Maciej Cieślik

### Technologie
- **Spring** – backend, obsługa baz danych
- **React** – frontend
- **Node.js** – obsługa niektórych procesów, API
- **Docker** – konteneryzacja aplikacji
- **Git** – kontrola wersji i współpraca zespołowa

### Funkcjonalności Aplikacji

1. **Logowanie i Rejestracja**
   - Logowanie za pomocą konta i hasła
   - Rejestracja przez email
   - Odzyskiwanie hasła
   - Logowanie za pomocą OAuth

2. **Tworzenie Fiszek**
   - Tworzenie folderów na fiszki
   - Modyfikacja i usuwanie fiszek
   - Obsługa trybów powtarzania materiału: Klasyczne fiszki
   - Import i eksport fiszek

3. **Algorytm Powtarzania – Spaced Repetition**
   - Algorytm zaplanowany jako serwis, który planuje pojawianie się fiszek zgodnie z metodą „spaced repetition”

4. **Statystyki**
   - Śledzenie postępów użytkownika
   - Statystyki użytkownika, takie jak:
     - Ilość przejrzanych fiszek w ciągu dnia
     - Ilość fiszek do przejrzenia

5. **Zarządzanie Fiszkami**
   - Zamiana przodu fiszki z tyłem
   - Przechowywanie danych w bazie danych

### Dodatkowe Funkcjonalności

- Powiadomienia – wysyłane mailem
- Udostępnianie fiszek – możliwość współdzielenia z innymi użytkownikami

### Rezultat
Ekran logowania:
![login_screen](result/login_page.png)

Ekran główny:
![main_screen](result/main_screen.png)

Ekran importów/eksportów:
![import/export_screen](result/import_export_screen.png)

Ekran statystyk:
![statistics_screen](result/statistics_page.png)

### Dalsze Pomysły
- Rankingi użytkowników

### Przydatne komendy
- "docker compose down -v --rmi all" wyłącza kontenery, usuwa pamięć i obrazy
- "docker compose up" uruchamia aplikacje

