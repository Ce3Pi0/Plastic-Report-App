# Plastic Report App

![Ionic React](https://img.shields.io/badge/Frontend-Ionic%20React-blue)
![Vite](https://img.shields.io/badge/Build-Vite-purple)
![Flask](https://img.shields.io/badge/Backend-Flask-green)
![Python](https://img.shields.io/badge/Language-Python-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![Supabase](https://img.shields.io/badge/Database-Supabase-brightgreen)
![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-orange)
![License](https://img.shields.io/badge/License-Custom-red)

---

A full-stack reporting application that allows users to
report plastic waste with images and accurate map location. Administrator users
manage reports and issues submitted by clients.

* Live Demo: [https://messengerapp-o1e8.onrender.com  ](https://plastic-report-app.onrender.com/)
* Repository: [https://github.com/Ce3Pi0/Plastic-Report-App](https://github.com/Ce3Pi0/Plastic-Report-App)

---

## Table of contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Environment Variables](#environment-variables)
- [System Architecture](#system-architecture)
- [API Architecture](#api-architecture)
- [Database Design](#database-design)
- [Deployment Architecture](#deployment-architecture)
- [Testing Strategy](#testing-strategy)
- [Coding Style](#coding-style)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Built With](#built-with)
- [License](#license)

---

<a id="getting-started"></a>
## Getting Started

This project is a full-stack application built with **Ionic React (Vite)**
and **Flask**, designed for reporting and managing plastic waste
using geolocation and cloud stored images.

---

<a id="prerequisites"></a>
## Prerequisites

-   Node.js (v18+)
-   npm
-   Python (3.10+)
-   Supabase account
-   Cloudinary account
-   Google Maps API key
-   EmailJS account

---

<a id="installing"></a>
## Installing

Clone the repository:

```bash
    git clone https://github.com/Ce3Pi0/Plastic-Report-App.git
    cd Plastic-Report-App
```

Install dependencies & Create Virtual Environment:

```bash
    cd Frontend && npm install
    cd ../Backend && python -m venv <ENV_NAME> && . <ENV_NAME>/Scripts/activate && pip install -r requirements.txt
```

<a id="environment-variables"></a>
## Environment Variables

Create .env files for both frontend and backend.

- Frontend:
  
```bash
    VITE_DOMAIN
    VITE_DEFAULT_ZOOM
    VITE_EMAILJS_PUBLIC_KEY
    VITE_EMAILJS_SERVICE_ID
    VITE_EMAILJS_TEMPLATE_ID
    VITE_GOOGLE_MAPS_API_KEY
    VITE_MACEDONIA_LAT
    VITE_MACEDONIA_LNG
    VITE_UNSAFE_PASSWORD
```

- Backend:

```bash
    CLOUDINARY_API_KEY
    CLOUDINARY_API_SECRET
    CLOUDINARY_NAME
    DATABASE_URL
    DEV_FRONTEND_DOMAIN
    ENV
    FRONTEND_PORT
    HOST
    JWT_SECRET
    MAIL_PASSWORD
    MAIL_PORT
    MAIL_SERVER
    MAIL_USERNAME
    MY_MAIL
    PASS_LEN
    PORT
    PROD_FRONTEND_DOMAIN
    PYTHON_VERSION
    REQUEST_TIMER_LIMIT
    SECRET_KEY
```

#### Development URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

<a id="running-the-project"></a>
## Running the Project

- Separate Services:
  - Backend:
  
  ```bash
      cd Backend
      flask run
  ```
  
  - Frontend:
   
  ```bash
      cd Frontend
      npm run dev
  ```

- Single Service:
  - Frontend:
   
  ```bash
      cd Frontend
      npm run build
  ```
  
  - Backend:
  
  ```bash
      cd Backend
      flask run
  ```

<a id="system-architecture"></a>

## System Architecture

### High Level Architecture

![PlasticReportAppSystemArchitecture](https://github.com/user-attachments/assets/9ea5ceda-f99e-4938-a843-0c51d2b53185)

### Architecture Principles

1. #### Client-Server Separation
   - Ionic React handles UI and rendering
   - Flask handles API and backend logic
1. #### Stateless Authentication
   - JWT-Based Authentication
   - Access + Refresh Token System
1. #### Cloud-Backed Media Layer
   - Cloudinary Handles Static Media Files:
1. #### Geolocation-Based Reporting System:
   - Frontend Integrates Google Maps API
1. #### Serverless Email Handling:
   - Frontend Integrates EmailJS

------------------------------------------------------------------------

<a id="api-architecture"></a>

## API Architecture

### Base URL

```
<hostname>/api/v<version number>
```

- ### Authentication
  
  | Method | Endpoint                                      | Description                   |
  | ------ | --------------------------------------------- | ----------------------------- |
  | POST   | /api/v1/auth/register                         | Register a new user           |
  | POST   | /api/v1/auth/login                            | Login user                    |
  | GET    | /api/v1/auth/refresh_token                    | Refresh access token          |
  | GET    | /api/v1/auth/send_confirm_email_token?email=  | Send verification email token |
  | POST   | /api/v1/auth/confirm_email?token=             | Confirm email                 |
  | GET    | /api/v1/auth/forgot_password_token?email=     | Send forgot password token    |
  | POST   | /api/v1/auth/forgot_password?token=&password= | Update forgotten password     |

- ### User Management
  
  | Method | Endpoint                | Description |
  | ------ | ----------------------- | ----------- |
  | GET    | /api/v1/user?id=&query= | Get user(s) |
  | POST   | /api/v1/user            | Create user |
  | PUT    | /api/v1/user?id=        | Update user |
  | DELETE | /api/v1/user?id=        | Delete user |

- ### Requests
  
  | Method | Endpoint                       | Description    |
  | ------ | ------------------------------ | -------------- |
  | GET    | /api/v1/request?id=&user_id=   | Get request(s) |
  | POST   | /api/v1/request?type=&user_id= | Create request |
  | PUT    | /api/v1/request?user_id=&type= | Update request |
  | DELETE | /api/v1/request?id=&user_id=   | Delete request |

- ### Reports
  
  | Method | Endpoint                   | Description   |
  | ------ | -------------------------- | ------------- |
  | GET    | /api/v1/report?id=&status= | Get report(s) |
  | POST   | /api/v1/report             | Create report |
  | PUT    | /api/v1/report?id=&status= | Update report |
  | DELETE | /api/v1/report?id=         | Delete report |

- ### Issue
  | Method | Endpoint                 | Description  |
  | ------ | ------------------------ | ------------ |
  | GET    | /api/v1/issue?id=        | Get issue(s) |
  | POST   | /api/v1/issue            | Create issue |
  | PUT    | /api/v1/issue?id=&fixed= | Update issue |
  | DELETE | /api/v1/issue?id=        | Delete issue |


## Core Features

-   User Authentication (JWT-based)
-   Report creation with geolocation
-   Image upload via Cloudinary
-   Status tracking for reports
-   Issue management


## Database Design

Table issue

  Name          Type      Constraints
  ------------- --------- -------------
  id            int4      Primary
  name          varchar   
  description   varchar   Nullable
  fixed         bool      
  user_id       int4      

Table report

  Name         Type      Constraints
  ------------ --------- -------------
  id           int4      Primary
  lat          varchar   
  lon          varchar   
  url          varchar   Nullable
  public_url   varchar   Nullable
  status       varchar   
  user_id      int4      

Table request

  Name      Type      Constraints
  --------- --------- -------------
  id        int4      Primary
  type      varchar   
  time      varchar   Nullable
  user_id   int4      

Table user

  Name         Type      Constraints
  ------------ --------- -------------
  id           int4      Primary
  type         varchar   
  name         varchar   
  url          varchar   Nullable
  public_url   varchar   Nullable
  username     varchar   Unique
  email        varchar   Unique
  confirmed    bool      
  password     varchar   
  salt         varchar   Unique
  gender       varchar   Nullable

------------------------------------------------------------------------

Deployment Architecture

    Frontend (Vite build) -> Served via Flask
    Backend (Flask) -> Render Web Service
    Database -> Supabase
    Media -> Cloudinary

------------------------------------------------------------------------

Testing Strategy

Manual testing recommended using tools like Postman.

Test key flows: - Authentication - Report creation - Image uploads - Map
rendering - Status updates

------------------------------------------------------------------------

Coding Style

-   ESLint (Frontend)
-   TypeScript strict typing
-   Python best practices (Flask + Pydantic validation)

------------------------------------------------------------------------

Deployment

Hosted on Render.

Build Command

    cd Frontend && npm install && npm run build && cd ../Backend && pip install -r requirements.txt

Start Command

    gunicorn --chdir Backend/main --bind 0.0.0.0:$PORT App:app

------------------------------------------------------------------------

Built With

-   Ionic React (TypeScript)
-   Vite
-   Flask
-   Supabase
-   Cloudinary
-   Tailwind CSS
-   Google Maps API
-   EmailJS

------------------------------------------------------------------------

License

This project is for educational and portfolio purposes.

------------------------------------------------------------------------

Acknowledgments

-   Render
-   Supabase
-   Cloudinary
-   Google Maps Platform
-   EmailJS
