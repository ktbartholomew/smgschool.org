import {
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "next-sanity";

export type Page = {
  _id: string;
  title: string;
  sections: (
    | {
        _type: "twoColumnHeroBlock";
        _key: string;
        title?: string;
        column1: PortableTextBlock[];
        column2: PortableTextBlock[];
      }
    | {
        _type: "twoColumnTextBlock";
        _key: string;
        title?: string;
        column1: PortableTextBlock[];
        column2: PortableTextBlock[];
      }
    | {
        _type: "textBlock";
        _key: string;
        title?: string;
        content: PortableTextBlock[];
      }
    | {
        _type: "heroBlock";
        _key: string;
        title?: string;
        image?: SanityImageSource & SanityImageObject;
      }
    | {
        _type: "donationBlock";
        _key: string;
        title?: string;
        content: PortableTextBlock[];
        paymentLinkUrl: string;
      }
    | {
        _type: "formEmbedBlock";
        _key: string;
        title?: string;
        url: string;
      }
    | {
        _type: "personListBlock";
        _key: string;
        title: string;
      }
  )[];
  sidebarSections?: {
    _type: "textBlock";
    _key: string;
    title?: string;
    content: PortableTextBlock[];
  }[];
  seoTitle?: string;
  seoDescription?: string;
};
