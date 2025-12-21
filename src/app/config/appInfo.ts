export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: 'project-management',
  websiteDomain: process.env.NEXT_PUBLIC_AMP_DOMAIN ?? 'http://localhost:3000',
  apiDomain: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8080',
  apiBasePath: '/auth',
};
