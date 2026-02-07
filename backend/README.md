# Fixora – Backend API Documentation

## Project Overview
Fixora backend is a RESTful API built using **Node.js, Express, and MongoDB**.  
It handles authentication, user management, services, bookings, payments, addresses, and notifications.

---

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Razorpay (Payments)
- Google OAuth
- bcrypt (Password hashing)

---

## Folder Structure

src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
└── app.js

---

## Environment Variables (.env)

PORT=5000  
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_jwt_secret  
GOOGLE_CLIENT_ID=your_google_client_id  
RAZORPAY_KEY_ID=your_razorpay_key  
RAZORPAY_KEY_SECRET=your_razorpay_secret  

---

## Authentication APIs

### POST /api/auth/register
**Purpose:** Register new user  

Flow:
1. Request body → name, email, password, role  
2. Check existing user  
3. Hash password  
4. Save user  
5. Generate JWT  
6. Return token + user  

---

### POST /api/auth/login
**Purpose:** Login user  

Flow:
1. Email + password  
2. Compare password  
3. Generate JWT  
4. Return token + user  

---

### POST /api/auth/google/customer
**Purpose:** Google login for customer  

Flow:
1. Google token received  
2. Verify with Google  
3. Create/find user  
4. Generate JWT  

---

## Profile APIs

### GET /api/profile/me
Fetch logged-in user profile  

### PUT /api/profile/update
Update name, phone, avatar  

### PUT /api/profile/change-password
Change user password  

Flow:
1. JWT verified
2. User fetched from DB
3. Update operation
4. Save and respond

---

## Address APIs

POST   /api/addresses  
GET    /api/addresses  
PUT    /api/addresses/:id  
DELETE /api/addresses/:id  
PUT    /api/addresses/:id/default  

Address Flow:
1. Address linked to user
2. First address auto-default
3. Only one default allowed
4. If default deleted → next becomes default

---

## Service APIs

GET /api/services  
GET /api/services/:id  

Flow:
- Fetch services from DB
- Public access

---

## Booking APIs

POST /api/bookings  
GET  /api/bookings/my  
GET  /api/bookings/:id  

Booking Flow:
1. Customer selects service
2. Address attached
3. Booking created
4. Status = PENDING
5. Provider updates later

---

## Payment APIs

### Online (Razorpay)

POST /api/payments/razorpay/order  
POST /api/payments/razorpay/verify  

Flow:
1. Create Razorpay order
2. Payment success callback
3. Verify signature
4. Update booking/payment status

---

### Offline Payment

POST /api/payments/offline  
PUT  /api/provider/payments/offline/verify  

Flow:
1. Customer selects offline
2. Provider verifies later
3. Status updated

---

## Notification APIs

GET  /api/notifications/my  
POST /api/notifications/mark-read  

Flow:
1. Notifications stored in DB
2. Triggered on booking/payment changes
3. Customer fetches notifications

---

## Security
- JWT verification middleware
- Role-based access
- Protected routes
- Central error handling

---

## Backend Status
✅ Authentication  
✅ Booking system  
✅ Payments (Online + Offline)  
✅ Notifications  
✅ Production ready  

---
