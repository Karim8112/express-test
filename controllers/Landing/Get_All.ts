import express from "express";
import {
  Hero,
  whatWeDo,
  additionalSection,
  aboutUs,
  list,
  contactInfo,
} from "../../models/Landing.js";

async function GetLandingPageData(req: express.Request, res: express.Response) {
  try {
    // Execute all 6 database queries concurrently for maximum performance
    const [
      heroData,
      whatWeDoData,
      additionalSectionData,
      aboutUsData,
      listData,
      contactInfoData,
    ] = await Promise.all([
      Hero.find(),
      whatWeDo.find(),
      additionalSection.find(),
      aboutUs.find(),
      list.find(),
      contactInfo.find(),
    ]);

    res.status(200).json({
      status: "success",
      data: {
        hero: heroData,
        whatWeDo: whatWeDoData,
        additionalSection: additionalSectionData,
        aboutUs: aboutUsData,
        list: listData,
        contactInfo: contactInfoData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to fetch landing page data",
    });
  }
}

export default GetLandingPageData;
