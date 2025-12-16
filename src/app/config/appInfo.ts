export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: 'project-management',
  websiteDomain: process.env.AMP_DOMAIN ?? 'http://localhost:3000',
  apiDomain: process.env.EBS_DOMAIN ?? 'http://localhost:8080',
  apiBasePath: '/auth',
};
