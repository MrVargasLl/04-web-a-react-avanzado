import axios from 'axios'

export const generateFromOllama = async (userPrompt) => {
    const res = await axios.post("http://localhost:11434/api/generate", {
        model: "gemma2",
        prompt: userPrompt,
        stream: false,
    });

    return res.data.response;
};

