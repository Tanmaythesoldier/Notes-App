
const { GoogleGenAI } =  require("@google/genai");

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

async function algenerator(massage) {
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: massage,
  });

  return response.text
}


module.exports = algenerator;