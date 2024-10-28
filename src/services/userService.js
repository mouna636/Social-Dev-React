import axiosInstance from '../api/axiosInstance';

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');

    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);

    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const getUserByUsername = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/find/${id}`);

    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    await axiosInstance.post('/users', data);
    alert('User profile created successfully');
  } catch (error) {
    console.error('Error creating profile:', error);
  }
};

export const updateUser = async (user) => {
  try {
    const res = await axiosInstance.put(`/users/${user.id}`, user);
    console.log(res);
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    console.error('Error deleting profile:', error);
  }
};
