import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'apps/web/e2e',webServer:{command:'npm start',url:'http://127.0.0.1:4000',reuseExistingServer:true},use:{baseURL:'http://127.0.0.1:4000',trace:'on-first-retry'}});
