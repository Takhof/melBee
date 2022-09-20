import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../organisms/Profile";
import ContactList from "../organisms/ContactList";
import MyTemplates from "../organisms/MyTemplates";
import SentHistory from "../organisms/SentHistory";
import "../../header.css";

type Props = {
  analytics: string;
  setAnalytics: Function;
  countSent: number;
  setCountSent: Function;
  reachLimit: boolean;
  sendLimit: number;
};

interface expand {
  profile: boolean;
  contact: boolean;
  template: boolean;
  history: boolean;
  [key: string]: boolean;
}

const Portal: React.FC<Props> = ({
  analytics,
  setAnalytics,
  countSent,
  setCountSent,
  sendLimit,
  reachLimit,
}) => {
  const navigate = useNavigate();
  const [expand, setExpand] = useState<expand>({
    profile: false,
    contact: false,
    template: false,
    history: false,
  });

  return (
    // <div className="px-10 w-screen h-screen pt-5">
    <div className="w-4/5 mx-auto">
      <div className="flex justify-between mb-6">
        <div className="text-left">
          <h2 className="font-bold text-3xl">melBeeへようこそ!</h2>
          {!reachLimit ? (
            <p className="mt-4">
              本日 <strong>{countSent} 通</strong> 送信されました。残り{" "}
              <strong>{sendLimit - countSent} 通</strong> 送信できます。
            </p>
          ) : (
            <p className="text-lg mt-4 pl-4">
              本日の送信リミットに達しましたが、引き続きテンプレート作成はご利用いただけます。
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              navigate("/user/templates");
            }}
            className="rounded-xl px-6 py-4 my-3 drop-shadow-xl text-lg text-white font-medium bg-orangeGradation"
          >
            新規作成
          </button>
        </div>
      </div>

      <Profile
        analytics={analytics}
        setAnalytics={setAnalytics}
        expand={expand.profile}
        setExpand={setExpand}
      />

      <ContactList expand={expand.contact} setExpand={setExpand} />

      <MyTemplates expand={expand.template} setExpand={setExpand} />

      <SentHistory
        expand={expand.history}
        setExpand={setExpand}
        countSent={countSent}
        setCountSent={setCountSent}
      />
    </div>
  );
};

export default Portal;
