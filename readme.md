# **Event Management Application**

## **Overview**

The Event Management Application allows users to create, manage, and share events seamlessly. This full-stack application is built using Next.js for the frontend and Django for the backend, providing a secure, scalable, and responsive solution for event management.

## **Features**

- **User Authentication**:
  - User registration and login functionality.
  - Secured routes using JWT (JSON Web Tokens).

- **Event Management**:
  - Create, read, update, and delete events.
  - Each event includes a title, description, date, location, and optional reminders.

- **Event Invitations**:
  - Invite others to events via email.

- **Data Persistence**:
  - User and event data are persisted in a relational database (e.g., SQLlite3).

- **User Interface**:
  - Responsive and user-friendly interface.
  - Filter events by date and location.

## **Getting Started**

### **Prerequisites**

- **Node.js**: Ensure you have Node.js installed. Download it [here](https://nodejs.org/).
- **Python**: Ensure you have Python installed. Download it [here](https://www.python.org/).
- **Django**: Install Django using pip: `pip install django`.
- **PostgreSQL**: (Optional) For production, you may want to use PostgreSQL. Install it [here](https://www.postgresql.org/).

### **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/event-management.git
   cd event-management
   ```

2. **Backend Setup (Django)**:
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```

   - Install the dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Make migrations
     ```bash
     python manage.py makemigrations
     ```
   - Apply migrations:
     ```bash
     python manage.py migrate
     ```
   - Run the development server:
     ```bash
     python manage.py runserver
     ```

3. **Frontend Setup (Next.js)**:
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```

### **Environment Variables**

Create a `.env` file in the `backend` and `frontend` directories and add the following environment variables:

- **Backend (`backend/.env`)**:
  ```env
  SECRET_KEY=your-secret-key
  DEBUG=True
  ALLOWED_HOSTS=localhost,127.0.0.1
  EMAIL_HOST_USER=
  EMAIL_HOST_PASSWORD=
  ```

- **Frontend (`frontend/.env.local`)**:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8000/api
  ```

### **Usage**

- **Frontend**:
  - Access the frontend at `http://localhost:3000`.
  - Register or log in to start managing your events.
  - Use the event management dashboard to create, view, update, and delete events.
  - Invite others to your events via email.

- **Backend**:
  - The API is available at `http://localhost:8000/api`.
  - The admin interface can be accessed at `http://localhost:8000/admin`.


## **Contributing**

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **Contact**

For any questions or suggestions, please contact [your_email@example.com](mailto:your_email@example.com).