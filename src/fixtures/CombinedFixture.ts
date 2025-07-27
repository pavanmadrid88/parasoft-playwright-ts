import { mergeTests } from '@playwright/test';
import { userRegistrationFixture } from './UserRegistrationFixture';
import { accountCreationFixture } from './AccountCreationFixture';

export const test = mergeTests(userRegistrationFixture, accountCreationFixture);