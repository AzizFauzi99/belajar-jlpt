import type { NextConfig } from 'next';

const config: NextConfig = {
  // modul native, jangan di-bundle
  serverExternalPackages: ['better-sqlite3'],
};

export default config;
