declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_ID: string;
    GOOGLE_CLIENT_SECRET: string
    MONGODB_URI: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
    NEXTAUTH_URL_INTERNAL: string
  }
}