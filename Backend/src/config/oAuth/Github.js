import { GitHub } from "arctic";

const github = new GitHub(
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET,
  "http://localhost:3000/api/auth/github/callback" // backend callback
);

export default github;
