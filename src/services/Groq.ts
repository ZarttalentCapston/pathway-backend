import axios from "axios";

const Grok_Api_key = process.env.GROK_API_KEY;

export const getCareerRecommendation = async (
  currentRole: string,
  targetRole: string,
  currentSkills: string[] = []
) => {
  const prompt = `
    You are a smart AI helping users transition in their careers.

    The user is currently a **${currentRole}**.
    Their goal is to become a **${targetRole}**.
    They currently know : ${currentSkills.join(", ") || "nothing"}.

    Based on this, recommend:
    1. Top 5 skills they should learn next.
    2. One learning resource (URL + title) per skill.

    Respond in JSON format like:
{
  "skillsToLearn": [...],
  "resources": [{ "skill": "...", "title": "...", "url": "..." }]
}
    `;

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model : "mixtral-8x7b-32768",
                messages : [
                    {
                        role : "user",
                        content : prompt
                    }
                ],
                temperature : 0.7
            },
            {
                headers : {
                    "Authorization" : `Bearer ${Grok_Api_key}`,
                    "Content-Type" : "application/json",
                }
            }
        )

        const message = await response.data.choices[0].message.content
        return JSON.parse(message)
    } catch (err) {
        console.error('Groq API error:', err);
         throw err;
    }
};
