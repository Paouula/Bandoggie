import axios from "axios";

const useDataReviews = () => {
  const submitReview = async (data) => {
    const response = await axios.post("https://bandoggie-production.up.railway.app/api/reviews", data);
    return response.data;
  };

  return { submitReview };
};

export default useDataReviews;
