const openAi = process.env.REACT_APP_OPENAI;
const url = "https://api.openai.com/v1/chat/completions";

const lengthOfStory = (length) => {
  switch (length) {
    case "short":
      return "under 3 paragraphs";
    case "medium":
      return "3 to 5 paragraphs";
    case "long":
      return "5 to 8 paragraphs";
    default:
      return "5 to 8 paragraphs";
  }
};

const storyGeneratorCall = async (prompt, length) => {
  const data = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content: `${prompt} with the length of the generated content has to be : ${lengthOfStory(
          length
        )}. 
        Also create the title of this story (and add the correct font to it based on the genre of the story).
        Also note the phrases title and quotes around the story should be removed`,
      },
    ],
  };

  const params = {
    headers: {
      Authorization: `Bearer ${openAi}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      if (data?.choices?.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error("No story generated");
      }
    })
    .catch((error) => {
      console.error("error generating story", error);
      return Promise.reject(
        "Unable to create a story with the info. Please try again"
      );
    });
};

export default storyGeneratorCall;
