export interface IPhoto {
  id: string;
  urls: {
    small_s3: string;
  };
  description: string;
  user: {
    first_name: string;
    last_name: string;
  };
}
