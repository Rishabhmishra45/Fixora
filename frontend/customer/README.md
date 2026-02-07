# Fixora – Customer Frontend Documentation

## Project Overview
Customer frontend is a **React + Vite + Tailwind CSS v4** application that allows users to:
- Register / Login
- Book services
- Manage addresses
- Make payments
- Receive notifications

---

## Tech Stack
- React 18
- Vite
- Tailwind CSS v4
- Framer Motion
- Axios
- React Router DOM

---

## Environment Variables

VITE_API_URL=http://localhost:5000/api  
VITE_GOOGLE_CLIENT_ID=your_google_client_id  

---

## Folder Structure

src/
├── api/
├── auth/
├── components/
├── context/
├── pages/
├── routes/
└── utils/

---

## Authentication Flow (Frontend)

1. User logs in / registers
2. Backend returns JWT
3. Token stored in localStorage (fixora-token)
4. User stored in localStorage (fixora-user)
5. Axios interceptor attaches token
6. Protected routes enabled

---

## Auth APIs Used

POST /api/auth/register  
POST /api/auth/login  
POST /api/auth/google/customer  

---

## Profile Flow

APIs:
GET /api/profile/me  
PUT /api/profile/update  
PUT /api/profile/change-password  

Flow:
1. Dashboard loads
2. Profile fetched
3. User updates info
4. Toast shown

---

## Address Management (Customer)

APIs:
POST   /api/addresses  
GET    /api/addresses  
PUT    /api/addresses/:id  
DELETE /api/addresses/:id  
PUT    /api/addresses/:id/default  

Flow:
1. User adds address
2. Default address selected
3. Used during booking

---

## Service Browsing

GET /api/services  
GET /api/services/:id  

Flow:
- Services displayed
- Details page
- Book service

---

## Booking Flow

POST /api/bookings  
GET  /api/bookings/my  
GET  /api/bookings/:id  

Steps:
1. Select service
2. Select address
3. Confirm booking
4. Status updates shown

---

## Payment Flow

### Online
- Razorpay checkout
- Payment verification
- Status updated

### Offline
- Pay after service
- Provider verifies later

---

## Notifications

GET  /api/notifications/my  
POST /api/notifications/mark-read  

Flow:
1. Poll every 15s
2. Notification bell updates
3. Read/unread supported

---

## UI / UX Features
- Fully responsive
- Dark / Light / Midnight mode
- Animations using Framer Motion
- Toast notifications
- Global loaders

---

## Security
- Auto logout on 401
- Protected routes
- Axios interceptors

---

## Customer App Status
✅ Complete  
✅ Production ready  
✅ SaaS-level architecture  

---
