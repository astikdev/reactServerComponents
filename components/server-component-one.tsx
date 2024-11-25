import fs from "fs";

export const serverComponentOne = () => {
  fs.readFileSync("..\..\","utf-8")
  return <div>server Component One</div>;
};
