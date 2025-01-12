#!/usr/bin/env node
import { migrateLegacyProject } from '@quai/quais-upgrades-core';

migrateLegacyProject().catch(e => {
  console.error(e);
  process.exit(1);
});
