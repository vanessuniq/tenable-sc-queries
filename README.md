# Tenable.sc Queries

This NestJS project provides a simple API to query Tenable.sc for scan results and vulnerabilities.

## Installation

1. Clone the repository
2. Run `yarn install`

## Running the application

Run `yarn run start` to start the application. The API will be available at `http://localhost:3000`.

## Endpoints

### Get Scan Results

**URL:** `/tenable/scan-results`

**Method:** `GET`

**Query Params:**

- `host`: The Tenable.sc host (required)
- `apiKey`: The Tenable.sc API key (required)
- `apiSecret`: The Tenable.sc API secret key (required)
- `startTime`: The start time for the scan results (optional, ISO 8601 format)
- `endTime`: The end time for the scan results (optional, ISO 8601 format)

### Get Scan Result

**URL:** `/tenable/scan-results/:resultId`

**Method:** `GET`

**Path Params:**

- `resultId`: The scan result ID (required)

**Query Params:**

- `host`: The Tenable.sc host (required)
- `apiKey`: The Tenable.sc API key (required)
- `apiSecret`: The Tenable.sc API secret key (required)

### Get Vulnerabilities

**URL:** `/tenable/vulnerabilities/:resultId`

**Method:** `GET`

**Path Params:**

- `resultId`: The scan result ID (required)

**Query Params:**

- `host`: The Tenable.sc host (required)
- `apiKey`: The Tenable.sc API key (required)
- `apiSecret`: The Tenable.sc API secret key (required)

## Running tests

Run `yarn run test` to execute the unit tests.
