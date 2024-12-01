import axiosInstance from "../api/axiosInstance";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getUserByUsername = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/find/${id}`);

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    await axiosInstance.post("/users", data);
    alert("User profile created successfully");
  } catch (error) {
    console.error("Error creating profile:", error);
  }
};

export const updateUser = async (user) => {
  try {
    const nuser = (await getUserByUsername(user.username)).data;
    const res = await axiosInstance.put(`/users/${nuser.id}`, user);
    console.log(res);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    console.error("Error deleting profile:", error);
  }
};

export const changePassword = async (id, data) => {
  await axiosInstance.patch("/users/" + id + "/changePassword", data);
};

export const connectUser = async (id, data) => {
  await axiosInstance.post("/connections/send/" + id, data);
};

export const getPendingConnections = async (id) => {
  try {
    const response = await axiosInstance.get("/connections/pending/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending connections:", error);
    throw error;
  }
};

export const acceptRequest = async (requestId) => {
  await axiosInstance.post("/connections/accept/" + requestId);
};

export const rejectRequest = async (requestId) => {
  await axiosInstance.post("/connections/reject/" + requestId);
};

export const getConnections = async (id) => {
  try {
    const response = await axiosInstance.get("/connections/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching connections:", error);
    throw error;
  }
};
