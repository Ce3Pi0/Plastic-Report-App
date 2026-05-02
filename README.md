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
- [Core Features](#core-features)
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

<a id="core-features"></a>
## Core Features

-   User Authentication (JWT-based)
-   Report creation with geolocation
-   Image upload via Cloudinary
-   Status tracking for reports
-   Issue management

<a id="database-design"></a>
## Database Design

- ### Issues Table
    | Name | Type | Constraints |
    |------|------|-------------|
    | `id` | `int4` | Primary |
    | `name` | `varchar` |  |
    | `description` | `varchar` |  Nullable |
    | `fixed` | `bool` |  |
    | `user_id` | `int4` |  |

- ### Reports Table
    | Name | Type | Constraints |
    |------|------|-------------|
    | `id` | `int4` | Primary |
    | `lat` | `varchar` |  |
    | `lon` | `varchar` |  |
    | `url` | `varchar` |  Nullable |
    | `public_url` | `varchar` |  Nullable |
    | `status` | `varchar` |  |
    | `user_id` | `int4` |  |

- ### Requests Table
    | Name | Type | Constraints |
    |------|------|-------------|
    | `id` | `int4` | Primary |
    | `type` | `varchar` |  |
    | `time` | `varchar` |  Nullable |
    | `user_id` | `int4` |  |

- ### User Table
    | Name | Type | Constraints |
    |------|------|-------------|
    | `id` | `int4` | Primary |
    | `type` | `varchar` |  |
    | `name` | `varchar` |  |
    | `url` | `varchar` |  Nullable |
    | `public_url` | `varchar` |  Nullable |
    | `username` | `varchar` |  Unique |
    | `email` | `varchar` |  Unique |
    | `confirmed` | `bool` |  |
    | `password` | `varchar` |  |
    | `salt` | `varchar` |  Unique |
    | `gender` | `varchar` |  Nullable |

---

- ### Relationships
  - Requests.user_id -> User (1 -> N)
  - Reports.user_id -> User (1 -> N)
  - Issues.user_id -> User (1 -> N)

<a id="deployment-architecture"></a>
## Deployment Architecture

```
Frontend (Vite build) -> Served via Flask / Static Hosting
Backend (Flask) -> Render Web Service
Database -> Supabase
Media -> Cloudinary
```

<a id="screenshots"></a>
## Screenshots:

- ### Login Page

<img width="357" height="730" alt="image" src="https://github.com/user-attachments/assets/7f091797-bfd7-47ca-bf4e-6ed1a033fe90" />

- ### Register Page

<img width="355" height="731" alt="image" src="https://github.com/user-attachments/assets/2f62328b-467b-4822-a44d-fc21c7f6e7b5" />

- ### Forgot Password Page

<img width="355" height="727" alt="image" src="https://github.com/user-attachments/assets/337c5799-c920-45b7-be7f-d563e3c92b6c" />

 - ### Home Page

<img width="348" height="735" alt="image" src="https://github.com/user-attachments/assets/9fd382b7-71ef-488c-9f9d-95dd7c96ea55" />

- ### About Page

<img width="357" height="730" alt="image" src="https://github.com/user-attachments/assets/1aa38cab-f8b1-45dc-bc1c-63dec5283009" />

<br />

<img width="344" height="732" alt="image" src="https://github.com/user-attachments/assets/765198fc-843a-40b7-80a2-680fd6f1535e" />

- ### Contact Page

<img width="355" height="732" alt="image" src="https://github.com/user-attachments/assets/0e35131b-0ff7-4412-a5c5-5a61894d0453" />

<br />

<img width="354" height="731" alt="image" src="https://github.com/user-attachments/assets/48c4f69f-bcd6-4800-8fd2-bee9ce468514" />

- ### Report an Issue Page

  #### Client

  <img width="354" height="729" alt="image" src="https://github.com/user-attachments/assets/5385e7ae-9f44-473d-a4be-163a6924486c" />

  #### Admin

  <img width="350" height="726" alt="image" src="https://github.com/user-attachments/assets/e0f7ff28-aabe-4669-8499-90f06ba0bd75" />

- ### Report Page

  #### Client
  
  <img width="354" height="728" alt="image" src="https://github.com/user-attachments/assets/00e73d7d-81c5-4ef5-8c72-ed1d50a5e33e" />

  <br />
  
  <img width="354" height="729" alt="image" src="https://github.com/user-attachments/assets/4ee13466-5ed8-409f-aa97-8aed69f72332" />

  #### Admin
  
  <img width="356" height="732" alt="image" src="https://github.com/user-attachments/assets/5c934316-9d2d-4fe7-8c7b-3df1d5b31738" />

  <br />

  <img width="350" height="725" alt="image" src="https://github.com/user-attachments/assets/85259f56-12b2-49b0-830a-58f38048c020" />

  <br />

- ### User Info Page

<img width="347" height="737" alt="image" src="https://github.com/user-attachments/assets/bf050c59-d5fa-46da-8eb9-d283d8ce2b8f" />

- ### Change Password Page

<img width="348" height="735" alt="image" src="https://github.com/user-attachments/assets/8c2cdb03-9223-4be8-b968-60d7fb68ba9d" />

<br />

<a id="testing-strategy"></a>
## Testing Strategy

This project does not include automated unit tests.

### Manual Testing (Postman)

- Import Postman collection from:
  ```bash
  /Postman/Plastic Report App.postman_collection.json
  ```
- Test the following endpoint groups:
  - Auth
  - User
  - Request
  - Report
  - Issue

<a id="coding-style"></a>
## Coding Style

- ESLint (TypeScript)
- TypeScript strict typing
- Pylance (Python)

<a id="deployment"></a>
## Deployment

Hosted on Render.

Build Command:

```bash
cd Frontend && npm install && npm run build && cd ../Backend && pip install -r requirements.txt
```

Start Command
```bash
    gunicorn --chdir Backend/main --bind 0.0.0.0:$PORT App:app (Production)
    flask run (Development)
```

<a id="built-with"></a>
## Built With

-   Ionic React (Vite & TypeScript)
-   Vite
-   Flask
-   Supabase
-   Cloudinary
-   Tailwind CSS
-   Google Maps API
-   EmailJS

<a id="license"></a>
## License

This project is for educational and portfolio purposes.
