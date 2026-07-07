# M-Class React WebView 
This page belongs to the Frontend (WebView) repository of the M-CLASS project. <br/>
You can find the other project repositories below: <br/>
[M-Class Backend](https://github.com/Miraeasset-MobileInternship/backend) : Backend of M-Class with SpringBoot <br/>

<br/><br/>

## Overview

M-Class is a full-stack fintech education app designed to help teenagers experience simulated banking and stock investment in a classroom environment.
The app digitises a classroom-based economic education model where students use class currency, manage assets, and learn basic financial concepts through practical activities.

<br/><br/>

## Background & Problem
In some classroom-based financial education programs, students use class currency and assigned roles to learn economic activities. However, these activities are often managed manually, which makes it difficult to track assets, transactions, and investment learning progress.
This project aimed to digitise the process and provide students with a more interactive way to learn banking and stock investment concepts.
<br/><br/>


## Overall Project Tech Stack

| Area | Tech | My Responsibility |
|---|---|---|
| Mobile App | ![iOS](https://img.shields.io/badge/iOS-Native-lightgrey?style=flat-square&logo=apple) ![WebView](https://img.shields.io/badge/WebView-React%20WebView-lightsteelblue?style=flat-square) | Collaborated / not my main responsibility |
| Frontend WebView | ![React](https://img.shields.io/badge/React-18.2.0-lightsteelblue?style=flat-square&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-lightblue?style=flat-square&logo=typescript) | Implemented core stock screens |
| Backend | ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-darkseagreen?style=flat-square&logo=springboot) | Implemented full backend |
| Database | ![MySQL](https://img.shields.io/badge/MySQL-Database-cornflowerblue?style=flat-square&logo=mysql&logoColor=white) | Designed and implemented schema |
| Cache / Token Management | ![Redis](https://img.shields.io/badge/Redis-Token%20Management-indianred?style=flat-square&logo=redis&logoColor=white) | Implemented token management |
| External API | ![Yahoo Finance](https://img.shields.io/badge/Yahoo%20Finance-Stock%20Data-mediumpurple?style=flat-square&logo=yahoo&logoColor=white) | Integrated stock data |
| UI / Design | ![Figma](https://img.shields.io/badge/Figma-Design-coral?style=flat-square&logo=figma&logoColor=white) | Participated in planning/design |
> Note: The iOS native wrapper was implemented by another team member. I was responsible for the React WebView screens and the Spring Boot backend.

<br/><br/>

## WebView Frontend Tech Stack

![React](https://img.shields.io/badge/React-18.2.0-lightsteelblue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-lightblue?style=flat-square&logo=typescript)
![React Router](https://img.shields.io/badge/React%20Router-6.9.0-salmon?style=flat-square&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.3.4-slateblue?style=flat-square&logo=axios&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-5.11.15-steelblue?style=flat-square&logo=mui&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.5.0-darkseagreen?style=flat-square)
![Victory](https://img.shields.io/badge/Victory-36.6.8-mediumaquamarine?style=flat-square)

<br/><br/>

## Architecture
![SystemArchitecture](./public/systemArc.png)

The app used an iOS native wrapper with React-based WebView screens for stock-related flows.
The React WebView communicated with the Spring Boot backend through REST APIs. The backend handled authentication, student data, banking features, simulated trading flows, and stock information. MySQL was used for relational data, Redis was used for token management, and Yahoo Finance API was used for stock-related data.

<br/><br/>

## Web Frontend Features

### Stock Detail Page
- Displayed current stock information
- Rendered stock chart data
- Showed related stocks
- Displayed stock news and company information
- Provided ranking sections such as today's stocks
- Connected stock detail data with backend APIs

### Buy Screen
- Displayed selected stock information
- Supported quantity and price-related input flow
- Calculated simulated order amount
- Connected the buy flow with backend APIs

### Sell Screen
- Displayed user-owned stock information
- Supported sell quantity input flow
- Connected the sell flow with backend APIs

### Mobile WebView Layout
- Implemented layouts designed for an iOS WebView environment
- Adjusted UI components for mobile screen constraints

<br/><br/>

## Demo

### Buy & Sell

<p align="center">
  <img src="./public/buy.gif" alt="Buy Demo" width="250" />
  <img src="./public/sell.gif" alt="Sell Demo" width="250" />
</p>

### Stock Detail View

<p align="center">
  <img src="./public/home.gif" alt="Stock Detail Demo" width="300" />
</p>

### Chart View

<p align="center">
  <img src="./public/chart.gif" alt="Chart Demo" width="300" />
</p>

### News View

<p align="center">
  <img src="./public/news.gif" alt="News Demo" width="300" />
</p>

<br/><br/>

## Project status

This repository focuses on the React WebView part of the original M-Class project.
The original project was built as an internship project and was not publicly deployed. The iOS native wrapper is not included in this repository. Some backend API and database setup may be required to run the full flow locally.
For portfolio purposes, this README focuses on the WebView screens I implemented, their user flows, and how they connected with the backend APIs.


<br/><br/>

## How to Run

### 1. Clone the repository

```bash
git clone
cd frontend-webview
```

### 2. Clone the repository

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

### 4. The app will run at http://localhost:3000
> Note: All screens require the Spring Boot backend and yahoo finance API to display full functionality.
