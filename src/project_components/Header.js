import React from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
const Header = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <Link to="/">
      <div className="container-fluid">
        <header className="d-flex justify-content-center align-items-center header mb-4">
          <h1 className="display-4 text-center">
            <Trans i18nKey="title"></Trans>
          </h1>
        </header>
      </div>
    </Link>
  );
};

export default Header;
