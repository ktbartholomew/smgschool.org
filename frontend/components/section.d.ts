export type Person = {
  _id: string;
  name: string;
  position?: string;
  photo?: SanityImageSource;
  contactEmail?: string;
  contactPhone?: string;
  experience?: string;
  bio?: any[];
};
