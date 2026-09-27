# ALLEN 2040 Student OS — API Contract

Base URL (local dev): `http://localhost:5000`

This document tracks the backend endpoints that are **currently implemented**.
Update it as new endpoints (missions, quizzes, rewards, leaderboard, AI) are added.

---

## GET /api/health

Basic health check to confirm the server is up and reachable.

**Request**
- Method: `GET`
- Path: `/api/health`
- Body: none

**Response** — `200 OK`
```json
{
  "status": "ok",
  "message": "ALLEN 2040 backend is running"
}
```

---

## GET /api/student

Returns mock profile data for the current student. No auth yet — always
returns the same single mock student.

**Request**
- Method: `GET`
- Path: `/api/student`
- Body: none

**Response** — `200 OK`
```json
{
  "id": "student-001",
  "name": "Alex",
  "xp": 1250,
  "level": 8,
  "walletPoints": 450,
  "greenPoints": 320
}
```

| Field         | Type   | Description                              |
|---------------|--------|-------------------------------------------|
| id            | string | Unique student identifier                 |
| name          | string | Student's display name                    |
| xp            | number | Total experience points earned            |
| level         | number | Current level derived from XP             |
| walletPoints  | number | Student wallet point balance              |
| greenPoints   | number | Sustainability / "green" point balance    |

---

## Errors

Any unmatched route returns:

**Response** — `404 Not Found`
```json
{
  "status": "error",
  "message": "Route not found: GET /api/some-bad-path"
}
```

---

## Not yet implemented

Missions, quizzes, XP/rewards write-endpoints, leaderboard, and AI-powered
explanations are planned but **not built yet**. They will be documented here
as they're added.
