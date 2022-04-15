import { User } from "database/models/user";

export const userProvider = [
  {
    provide: "USER_REPOSITORY",
    useValue: User,
  },
];
