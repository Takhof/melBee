import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Template from "./Template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { template, clickEvent, Props } from "../../../type";
import { templateAPI } from "../api";
import { useTranslation } from "react-i18next";

const MyTemplates: React.FC<Props["portalExpand"]> = ({
  expand,
  setExpand,
}) => {
  const navigate = useNavigate();
  const DOWN = "rotate-90";
  const UP = "-rotate-90";
  const [direction, setDirection] = useState<string>(DOWN);

  const [melBeeTemplates, setMelBeeTemplates] = useState<template[]>([]);
  const [myTemplates, setMyTemplates] = useState<template[]>([]);
  const [selectMy, SetSelectMy] = useState<number | null>(null);
  const [selectMb, SetSelectMb] = useState<number | null>(null);

  const { t } = useTranslation();

  const handleExpand = (e: clickEvent) => {
    e.preventDefault();
    setExpand({ template: !expand });
  };

  useEffect(() => {
    !expand ? setDirection(DOWN) : setDirection(UP);
  }, [expand]);

  useEffect(() => {
    (async function () {
      await templateAPI.getMelbee(1).then((res) => {
        if (!res[0]) templateAPI.seed();
      });
    })();
  }, []);

  useEffect(() => {
    (async function getAllTemplates() {
      const idToFetchAll = 0;
      const allTemplates = await templateAPI.getMelbee(idToFetchAll);
      setMelBeeTemplates(allTemplates);
    })();

    (async function () {
      const allMyTemplates = await templateAPI.getMy();
      setMyTemplates(allMyTemplates);
    })();
  }, []);

  useEffect(() => {
    const handleMyTemplate = (i: number) => {
      localStorage.setItem("melBeeTempStoragedraft", myTemplates[i].body);
      navigate("/user/edit");
    };
    if (selectMy !== null) handleMyTemplate(selectMy);
  }, [selectMy]);

  useEffect(() => {
    const handleMelBeeTemplate = async (i: number) => {
      const templateId = melBeeTemplates[i].id;
      const chosenTemplate = await templateAPI.getMelbee(templateId);
      localStorage.setItem("melBeeTempStoragedraft", chosenTemplate[0].body);
      navigate("/user/edit");
    };
    if (selectMb !== null) handleMelBeeTemplate(selectMb);
  }, [selectMb]);

  const handleRemove = async (i: number) => {
    const confirmDelete = window.confirm(t("保存テンプレートを削除しますか？"));
    const templateId = myTemplates[i].id;
    if (confirmDelete) {
      await templateAPI.deleteMy(templateId).then((deleteSuccess) => {
        if (deleteSuccess) {
          (async function () {
            const allMyTemplates = await templateAPI.getMy();
            setMyTemplates(allMyTemplates);
            alert(t("テンプレートが削除されました。"));
          })();
        } else {
          alert(t("エラーが生じました。再度お試しください。"));
        }
      });
    }
  };

  return (
    <div>
      <div className="justify-center sm:px-5 lg:px-10 py-6 mb-10 border rounded-lg drop-shadow-xl bg-white">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleExpand}
        >
          <h3 className="text-xl font-medium">{t("メールを作成")}</h3>
          <span className={direction}>
            {" "}
            <FontAwesomeIcon
              className="bg-yellow-200 rounded-lg p-1.5"
              icon={faArrowRight}
            />
          </span>
        </div>
        {expand && (
          <div className="md:flex md:justify-center">
            <div className="">
              {(myTemplates.length > 0 ||
                localStorage.melBeeTempStoragedraft) && (
                <div className="md:mb-9">
                  <p className="mt-4 mb-5 font-bold">{t("保存テンプレート")}</p>
                  <div className="md:grid lg:grid md:gap-2 lg:gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {localStorage.melBeeTempStoragedraft && (
                      <a
                        className="mb-5 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/user/edit");
                        }}
                      >
                        <Template
                          template={{
                            id: NaN,
                            thumbnail: "",
                            title: t("下書き"),
                            body: localStorage.melBeeTempStoragedraft,
                          }}
                        />
                      </a>
                    )}
                    {myTemplates.map((template, i) => {
                      return (
                        <div key={`myTemp${i}`} className="templateBox">
                          <a
                            className="mb-5 cursor-pointer align-top"
                            onClick={(e) => {
                              e.preventDefault();
                              SetSelectMy(i);
                            }}
                          >
                            <Template template={template} />
                          </a>
                          <button
                            type="submit"
                            value={i}
                            onClick={(e: clickEvent) => {
                              e.preventDefault();
                              handleRemove(i);
                            }}
                            className="rounded-xl px-5 py-2 text-white text-sm text-white bg-redGradation"
                          >
                            {t("削除")}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <p className="mt-5 mb-7 font-bold">
                  {t("melBeeオリジナル テンプレート")}
                </p>
                <div className="md:grid md:gap-2 lg:gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {melBeeTemplates.map((template, i) => {
                    return (
                      <div key={`mbTemp${i}`}>
                        <a
                          className="mb-5 cursor-pointer"
                          key={`mbTemp${i}`}
                          onClick={(e) => {
                            e.preventDefault();
                            SetSelectMb(i);
                          }}
                        >
                          <Template template={template} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTemplates;
