import useQuery from "@/hooks/useQuery";
import { pageService } from "@/services/pageService";

const useHomePage = () => {
  const {
    loading: loadingHome,
    data: dataHome,
    error,
  } = useQuery(() => pageService.getPageByName("home"));
  const homeData = dataHome?.data;

  const homeProps = {
    isLoading: loadingHome,
    homeData,
  };
  return {
    homeProps,
  };
};

export default useHomePage;
