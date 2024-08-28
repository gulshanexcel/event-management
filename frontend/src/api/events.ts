import { api } from './api'

export const fetchUser = async () => {
    return api.get("/profile/")
}

export const fetchToken = async () => {
    // 
}

/* 
{
  "title": "Event Title",
  "description": "Event Description",
  "date": "2024-08-31T10:00:00Z",
  "location": "Event Location",
  "reminder": "2024-08-30T10:00:00Z",
  "invitees": "invitee1@example.com,invitee2@example.com"
}
*/
export const createEvent = (data) => {
    return api.post("/events/", data)
}

export const deleteEvent = (id: number) => {
    return api.delete("/events/" + id + "/")
}

export const updateEvent = (id, data) => {
    return api.put("/events/" + id + "/", data)
}

export const getEvents = () => {
    return api.get("/events/")
}