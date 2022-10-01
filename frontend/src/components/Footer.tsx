import { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import { useTranslation } from "react-i18next";

function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      {showPrivacyPolicy && <PrivacyPolicy displayPP={setShowPrivacyPolicy} />}
      <footer>
        <div className="footer mt-auto w-full md:absolute md:bottom-0">
          <div className="flex px-4 py-8 footer_nav justify-between">
            <p className="text-xs text-center">
              ©2022 melBee, Inc - ALL RIGHTS RESERVED{" "}
            </p>
            <button
              className="text-xs"
              onClick={(e) => {
                e.preventDefault();
                setShowPrivacyPolicy(!showPrivacyPolicy);
              }}
            >
              {t("プライバシーポリシー")}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
