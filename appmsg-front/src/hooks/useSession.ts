import { useSelector } from "react-redux";
import { getSession } from "../store/selectors/selectSession";
import { useEffect, useState } from "react";
import { getCookie } from "../server/actions";

const useSession = () => {
  const session = useSelector(getSession);
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    async function onMount() {
      const access_token = await getCookie("access_token");
      setToken(access_token?.value);
    }
    onMount();
  }, []);

  return {
    session,
    token,
  };
};
export default useSession;
