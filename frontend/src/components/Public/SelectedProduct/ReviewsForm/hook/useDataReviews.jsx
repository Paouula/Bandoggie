import axios from "axios";

const useDataReviews = () => {
  const submitReview = async (data) => {
    const response = await axios.post("/api/reviews", data);
    return response.data;
  };

  return { submitReview };
};

export default useDataReviews;
