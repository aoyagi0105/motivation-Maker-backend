# motivation-Maker-backend
motivation-Maker-backendは、モバイルアプリケーション「motivation-Maker」のためのREST APIサーバーです。ユーザー認証、名言（モチベーションフレーズ）の取得、お気に入り管理、およびユーザーの言語設定に基づいた翻訳機能を提供します。

## Features
- JWT（JSON Web Token）ベースのログインおよび会員登録 
- 厳選されたモチベーションフレーズの提供
- ユーザー単位でのフレーズ追加・削除機能
- ユーザーのプロフィール設定に基づいた自動翻訳機能

## Tech Stack
- Backend: NestJS, TypeORM
- Database: PostgreSQL
- Auth: JWT
- Language: TypeScript

## Architecture Overview
NestJSのモジュールシステムを採用し、保守性と拡張性を高めた設計を行っています。各機能は独立したモジュールとして分離されており、Controller / Service / Entity / DTO のパターンに従って実装されています。

 - Auth Module: 会員登録、ログイン、トークンの発行および検証
 - User Module: ユーザー情報および言語設定の管理
 - Motivation Module: モチベーションフレーズの取得および管理ロジック
 - Favorite Module: ユーザーとお気に入りのフレーズ間のリレーション管理
 - Translation Module: 外部翻訳APIとの連携をカプセル化した独立モジュール

## Environment Variables
 - `ENV_HASH_ROUNDS_KEY`: bcrypt hash rounds
 - `JWT_SECRET_KEY`: secret key for JWT signing
 - `TRANSLATION_API_KEY`: API key for external translation service

Create a `.env` file based on `.env.example`.

## What I Focused On
- フロントエンドから独立し、予測可能でクリーンなAPI構造を設計しました。
- お気に入りや言語設定などのユーザー状態をサーバー側で一元管理し、デバイス間のデータ整合性を確保しました。
- 外部の翻訳APIへの依存を別モジュールに分離することで、将来的なサービス変更やメンテナンスを容易にしました。

## Related Repositories
- Frontend: https://github.com/aoyagi0105/motivation-Maker.git

## Installation & Run
```bash
git clone https://github.com/aoyagi0105/motivation-Maker-backend.git
cd motivation-Maker-backend

yarn install
yarn start:dev
```

