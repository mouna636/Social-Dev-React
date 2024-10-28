import axiosInstance from '../api/axiosInstance';

export const getExperiencesByUser = async (id) => {
  try {
    const response = await axiosInstance.get('/experience/user/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};

export const updateExperience = async (experience) => {
  try {
    const response = await axiosInstance.put(
      '/experience/' + experience.id,
      experience,
    );
    return response;
  } catch (error) {
    console.error('Error updating experience:', error);
    throw error;
  }
};

export const deleteExperience = async (id) => {
  try {
    const response = await axiosInstance.delete('/experience/' + id);
    return response;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};
