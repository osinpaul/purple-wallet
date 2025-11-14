# PurpleWallet

PurpleWallet теперь состоит из двух частей:

- **Frontend** — SPA на Angular.
- **Backend** — лёгкий API на Node.js + Express.

## Backend API (Node + Express)

### Запуск

```bash
npm run start:api
```

По умолчанию сервер слушает `http://localhost:3000` (порт можно переопределить переменной `PORT`). CORS включён, поэтому фронтенд на `4200` может обращаться к API без дополнительной настройки.

### Аутентификация

1. Отправьте `POST /api/v1/auth/login` с телом:

   ```json
   {
     "email": "user@example.com",
     "password": "any-non-empty-string"
   }
   ```

   Email проверяется на корректность формата, пароль должен быть непустым. На успешный запрос возвращается JWT:

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "tokenType": "Bearer",
     "expiresIn": "1h"
   }
   ```

2. Передавайте токен в заголовке `Authorization: Bearer <token>` для всех защищённых методов.

Секрет (`JWT_SECRET`) и время жизни (`JWT_EXPIRES_IN`) можно задавать через переменные окружения.

### Swagger UI

- Документация доступна в браузере по адресу `http://localhost:3000/docs` (Swagger UI подтягивает `server/openapi.yaml` автоматически).
- Сам YAML остаётся в `server/openapi.yaml`, поэтому его можно импортировать и в сторонние инструменты.

### Точки входа

| Метод | Endpoint                  | Назначение                                          | Авторизация      |
| ----- | ------------------------- | --------------------------------------------------- | ---------------- |
| GET   | `/api/v1/health`          | Проверка живости сервиса                            | Не требуется     |
| POST  | `/api/v1/auth/login`      | Выдаёт JWT по валидному email и непустому паролю    | Не требуется     |
| GET   | `/api/v1/profile`         | Данные владельца кошелька для шапки                 | Требуется Bearer |
| GET   | `/api/v1/assets`          | Список активов с количеством и оценкой в фиат       | Требуется Bearer |
| GET   | `/api/v1/assets/:assetId` | Отдельный актив по идентификатору (например, `btc`) | Требуется Bearer |
| GET   | `/api/v1/rates`           | Курсы криптовалют для страницы Rates                | Требуется Bearer |
| GET   | `/api/v1/rates/:assetId`  | Отдельный курс по идентификатору                    | Требуется Bearer |

### OpenAPI

Полное описание каждого метода доступно в `server/openapi.yaml`. Файл можно импортировать в Swagger UI / Postman / Stoplight и получить интерактивную документацию.

## Дополнительно

Документация по Angular CLI и справочник команд: [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
