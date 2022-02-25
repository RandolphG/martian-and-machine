const url: string = process.env.URL || "https://demo.martian.services/api";
const accessToken: string =
  process.env.ACCESS_TOKEN || "bWFydGlhbmFuZG1hY2hpbmU=";

export const getPosts = async () => {
  const headers = {
    "Content-Type": "application/json",
    "X-Auth": `${accessToken}`,
    "Access-Control-Allow-Origin": "*",
    mode: "no-cors",
  };

  try {
    return await fetch(`${url}/posts`, {
      method: "GET",
      headers,
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Failed");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(`Error : `, err);
        return err;
      });
  } catch (err) {
    console.log(`Error : `, err);
    return err;
  }
};
