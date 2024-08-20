# Offline Webhook Buffering App

## Overview

This application demonstrates how to handle API requests with offline support. The core feature of the app is a single button that, when clicked, triggers requests to a specified webhook endpoint. If the internet is unavailable, the app buffers these requests and sends them automatically once connectivity is restored.

## Features

- **Single Button Interface**: A simple UI with a button labeled "Hit Me" to trigger the webhook request.
- **Offline Support**: Requests are buffered when offline and sent when the internet connection is restored.
- **Seamless Connectivity Handling**: Automatically manages network status and ensures data integrity by retrying buffered requests.

## Getting Started

To get started with the project, follow these steps:


## Demo

[Demo Link]()

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/imnayakshubham/Survey-form-builder.git
    ```

2. Navigate to the project directory:

    ```bash
    cd survey-form-builder
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

The application should now be running at `http://localhost:5173`.