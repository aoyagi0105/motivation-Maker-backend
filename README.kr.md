# motivation-Maker-backend
motivation-Maker-backend는 모바일 애플리케이션 motivation-Maker를 위한 REST API 서버입니다.
사용자 인증, 모티베이션 문구 조회, 즐겨찾기 관리, 사용자 언어 설정 기반 번역 기능을 제공합니다.

## Features
- JWT 기반 로그인, 회원가입 
- 모티베이션 문구 조회
- 즐겨찾기 추가 / 제거
- 사용자 언어 설정 기반 번역 기능

## Tech Stack
- Backend: NestJS, TypeORM
- Database: PostgreSQL
- Auth: JWT
- Language: TypeScript

## Architecture Overview
 - Auth Module: 회원가입 / 로그인 / 인증 처리
 - User Module: 사용자 정보 및 언어 설정 관리
 - Motivation Module: 모티베이션 문구 조회
 - Favorite Module: 사용자별 즐겨찾기 관리
 - Translation Module: 문구 번역 기능

각 모듈은 NestJS의 Module 단위로 분리되어 있으며,
Controller / Service / Entity / DTO 구조로 작성했습니다.

## Environment Variables
 - `ENV_HASH_ROUNDS_KEY`: bcrypt hash rounds
 - `JWT_SECRET_KEY`: secret key for JWT signing
 - `TRANSLATION_API_KEY`: API key for external translation service

Create a `.env` file based on `.env.example`.

## What I Focused On
- 프론트엔드와 분리된 REST API 설계
- 사용자별 상태(즐겨찾기, 언어 설정)를 서버 기준으로 관리
- 외부 번역 API 의존성을 별도 모듈로 분리

## Related Repositories
- Frontend: https://github.com/aoyagi0105/motivation-Maker.git

## Installation & Run
```bash
git clone https://github.com/aoyagi0105/motivation-Maker-backend.git
cd motivation-Maker-backend

yarn install
yarn start:dev
```

