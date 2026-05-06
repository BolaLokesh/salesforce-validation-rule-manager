# Salesforce Validation Rule Manager

A full-stack web application that integrates with Salesforce using OAuth 2.0 and Salesforce APIs to manage Validation Rules from a custom React interface.

## Features

* Salesforce OAuth 2.0 Login
* Fetch Validation Rules from Salesforce
* Display Validation Rule Status (Active / Inactive)
* Enable or Disable Validation Rules
* React Frontend
* Node.js + Express Backend
* Salesforce Tooling API & Metadata API Integration

---

## Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js
* jsforce
* dotenv
* cors

### Salesforce

* Salesforce Developer Org
* Connected App / External Client App
* OAuth 2.0
* Tooling API
* Metadata API

---

# Project Structure

salesforce-validation-manager/

├── backend/

│ ├── routes/

│ ├── server.js

│ ├── package.json

│ └── .env

├── frontend/

│ ├── src/

│ ├── public/

│ ├── package.json

│ └── src/App.js

└── README.md

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/BolaLokesh/salesforce-validation-rule-manager.git
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside backend folder:

```env
PORT=5000

SF_LOGIN_URL=https://login.salesforce.com

SF_CLIENT_ID=YOUR_CLIENT_ID

SF_CLIENT_SECRET=YOUR_CLIENT_SECRET

SF_REDIRECT_URI=http://localhost:5000/api/callback
```

Start backend:

```bash
node server.js
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# Salesforce Configuration

1. Create Salesforce Developer Org
2. Create Validation Rules on Account Object
3. Create Connected App / External Client App
4. Enable OAuth Settings
5. Add Callback URL:

```text
http://localhost:5000/api/callback
```

6. Add OAuth Scopes:

* Full Access (full)
* Access and manage your data (api)
* Perform requests at any time (refresh_token)

---

# Application Workflow

1. User clicks "Login with Salesforce"
2. OAuth Authentication happens
3. User fetches validation rules
4. Validation rules are displayed
5. User enables/disables rules
6. Changes are updated in Salesforce

---

# APIs Used

* Salesforce OAuth 2.0
* Salesforce Tooling API
* Salesforce Metadata API

---

# Screenshots

* Salesforce Login
* Validation Rules List
* Enable / Disable Validation Rules

---

# Author

Bola Lokesh

GitHub:
https://github.com/BolaLokesh

---
