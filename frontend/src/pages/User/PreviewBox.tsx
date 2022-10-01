import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { templateAPI } from "./api";
import { templateToSave, clickEvent, Props } from "../../type";
import { useTranslation } from "react-i18next";

const PreviewBox: React.FC<Props["preview"]> = ({ reachLimit }) => {
  const navigate = useNavigate();
  const EDIT_PATH = "/user/edit";
  const SEND_PATH = "/user/send";
  const [title, setTitle] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleSave = async (e: clickEvent) => {
    e.preventDefault();
    if (title) {
      const templateToSave: templateToSave = {
        title: title,
        thumbnail: "",
        body: localStorage.melBeeTempStoragedraft,
      };
      const isSaved = await templateAPI.saveMy(templateToSave);
      setSaved(isSaved);
    } else {
      alert(
        "テンプレートを保存するにはタイトルが必要です。\n タイトルを入力してください。"
      );
    }
  };

  return (
    <div className="pt-24 mb-28">
      <h2 className="text-xl font-medium mb-1">{t("プレビュー")}</h2>
      <p className="mb-5">{t("送信前に内容をご確認ください")}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: localStorage.melBeeTempStoragedraft,
        }}
      />
      <div className="flex justify-center items-center mx-auto my-8">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(EDIT_PATH);
          }}
          className="rounded-xl px-6 py-2 drop-shadow-xl hover:drop-shadow-none text-lg text-white font-medium bg-grayGradation hoverEffect"
        >
          {t("< テンプレート編集")}
        </button>
        {!reachLimit ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(SEND_PATH);
            }}
            className="rounded-xl px-6 py-2 drop-shadow-xl hover:drop-shadow-none text-lg text-white font-medium bg-orangeGradation ml-6 hoverEffect"
          >
            {t("送信画面 >")}
          </button>
        ) : (
          <p className="ml-6">
            {t("申し訳ございません、本日の送信リミットに達しました。")}
          </p>
        )}
      </div>
      <div className="w-4/6 mx-auto mt-10">
        {!saved ? (
          <form onSubmit={handleSave}>
            <label className="text-left leading-loose">
              <span className="text-lg font-bold mb-2">
                {t("作成テンプレートタイトル")}
              </span>
              <br />
              <span className="text-base">
                {t("作成したテンプレートは保存可能です。")}
              </span>
              <input
                type="text"
                placeholder={t("タイトル（２０文字まで）")}
                maxLength={20}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-lg p-2 w-full mt-2"
              />
            </label>
            <p className="text-sm attention mt-1 mb-8 text-left">
              {t(
                "※テンプレートは「下書き」として自動保存もされます。タイトルを入力し保存することで、ご自身のオリジナルテンプレートとしても引き続きご利用いただけます。"
              )}
            </p>
            <button className="rounded-xl px-6 py-2 drop-shadow-xl hover:drop-shadow-none text-lg text-white font-medium bg-blueGradation hoverEffect">
              {t("保存")}
            </button>
          </form>
        ) : (
          <p>{t("テンプレートが保存されました。")}</p>
        )}
      </div>
    </div>
  );
};

export default PreviewBox;
