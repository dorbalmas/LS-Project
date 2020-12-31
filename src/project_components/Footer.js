import React from "react";
import { Trans, useTranslation } from "react-i18next";
const Footer = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div class="stylingFooter text-center ">
      <Trans i18nKey="description.part3"></Trans>
      <i class="fa fa-copyright"></i>
    </div>
  );
};

export default Footer;
