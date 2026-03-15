[한국어](./README.kr.md) | [日本語](./README.jp.md)
# motivation-Maker-backend
motivation-Maker-backend is a RESTful API server developed to power the motivation-Maker mobile application. It provides essential services including user authentication, motivational quote retrieval, favorites management, and automated translation based on user language preferences.

## Features
- Secure Login and Sign-up using JWT (JSON Web Tokens)
- Fetch and browse curated motivational quotes
- Add or remove quotes from user-specific favorites
- Multi-language support and translation logic based on user profile settings

## Tech Stack
- Backend: NestJS, TypeORM
- Database: PostgreSQL
- Auth: JWT
- Language: TypeScript

## Architecture Overview
The server follows the modular architecture of NestJS, ensuring high maintainability and scalability. Each feature is encapsulated within its own module, following the Controller / Service / Entity / DTO pattern.

Auth Module: Handles registration, login, and token issuance/validation.

User Module: Manages user profiles and language preferences.

Motivation Module: Handles logic for retrieving and updating motivational quotes.

Favorite Module: Manages the relationship between users and their saved quotes.

Translation Module: Decoupled service for handling multi-language quote delivery.

## Environment Variables
 - `ENV_HASH_ROUNDS_KEY`: bcrypt hash rounds
 - `JWT_SECRET_KEY`: secret key for JWT signing
 - `TRANSLATION_API_KEY`: API key for external translation service

Create a `.env` file based on `.env.example`.

## What I Focused On
- Designed a clean and predictable API structure decoupled from the frontend.
- Centralized user states (Favorites, Language settings) on the server to ensure data consistency across devices.
- Decoupled external translation API dependencies into a separate module for easier maintenance and potential future provider swaps.

## Related Repositories
- Frontend: https://github.com/aoyagi0105/motivation-Maker.git

## Installation & Run
```bash
git clone https://github.com/aoyagi0105/motivation-Maker-backend.git
cd motivation-Maker-backend

yarn install
yarn start:dev
```

